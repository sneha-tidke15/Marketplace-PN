import { useMemo, useState } from "react";
import { FiBell, FiBox, FiDollarSign, FiSave, FiShoppingBag, FiUpload, FiUsers } from "react-icons/fi";
import AnalyticsCard from "../components/AnalyticsCard";
import DashboardSidebar from "../components/DashboardSidebar";
import PageTransition from "../components/PageTransition";
import { useShop } from "../context/ShopContext";

const items = [
  { id: "dashboard", label: "Dashboard" },
  { id: "products", label: "Products" },
  { id: "orders", label: "Orders" },
  { id: "analytics", label: "Analytics" },
  { id: "customers", label: "Customers" },
  { id: "inventory", label: "Inventory" },
  { id: "add-product", label: "Add Product" },
  { id: "categories", label: "Categories" },
  { id: "settings", label: "Settings" }
];

const mediaLabels = ["Front view", "Side view", "Back view", "Inside/detail view", "Lifestyle/detail view", "Extra view"];

export default function SellerDashboard() {
  const [active, setActive] = useState("dashboard");
  const { notifications, products, categories, sellerCategories, addSellerCategory, addSellerProduct, showToast } = useShop();
  const sellerNotifications = notifications.filter((item) => item.role === "seller");

  return (
    <PageTransition>
      <section className="container-soft grid gap-8 py-12 lg:grid-cols-[280px_1fr]">
        <DashboardSidebar title="Seller Studio" items={items} active={active} setActive={setActive} />
        <div className="space-y-6">
          <h1 className="text-4xl font-black">Seller dashboard</h1>
          {active === "dashboard" && <DashboardHome sellerNotifications={sellerNotifications} />}
          {active === "products" && <ProductsSection products={products} />}
          {active === "orders" && <ListSection title="Order management" items={["Pending orders: 12", "Delivered orders: 84", "Return requests: 3", "Customer messages: 7"]} />}
          {active === "analytics" && <DashboardHome sellerNotifications={sellerNotifications} />}
          {active === "customers" && <ListSection title="Customers" items={["Repeat customers: 42", "New customers this month: 18", "Pending feedback requests: 5"]} />}
          {active === "inventory" && <ListSection title="Inventory" items={["Low stock products: 4", "In stock products: 36", "Draft listings: 2"]} />}
          {active === "add-product" && <AddProduct categories={categories} addSellerProduct={addSellerProduct} showToast={showToast} />}
          {active === "categories" && <CategoriesSection sellerCategories={sellerCategories} addSellerCategory={addSellerCategory} />}
          {active === "settings" && <ListSection title="Settings" items={["Shipping price: Rs. 69 base", "Delivery regions: All India", "Pincode pricing enabled", "Estimated delivery: 4-8 days"]} />}
        </div>
      </section>
    </PageTransition>
  );
}

function DashboardHome({ sellerNotifications }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-4">
        <AnalyticsCard icon={FiDollarSign} label="Revenue" value="Rs. 82k" tone="bg-mint" />
        <AnalyticsCard icon={FiShoppingBag} label="Orders" value="128" tone="bg-pastelPink" />
        <AnalyticsCard icon={FiBox} label="Products" value="36" tone="bg-pastelBlue" />
        <AnalyticsCard icon={FiBell} label="Alerts" value={String(sellerNotifications.length)} tone="bg-lavender" />
      </div>
      <div className="glass-card rounded-[30px] p-6">
        <h2 className="mb-4 text-2xl font-black">Notifications</h2>
        <div className="grid gap-3">
          {sellerNotifications.length ? sellerNotifications.map((item) => <p key={item.id} className="rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">{item.text}</p>) : <p className="rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">No seller alerts right now.</p>}
        </div>
      </div>
    </>
  );
}

function ProductsSection({ products }) {
  return (
    <div className="glass-card overflow-x-auto rounded-[30px] p-6">
      <h2 className="mb-4 text-2xl font-black">Product management</h2>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="text-slate-500 dark:text-slate-300"><th className="py-3">Product</th><th>Category</th><th>Price</th><th>Status</th></tr>
        </thead>
        <tbody>
          {products.slice(0, 12).map((product) => (
            <tr key={product.id} className="border-t border-white/60">
              <td className="py-3 font-bold">{product.title}</td>
              <td className="capitalize">{product.category}</td>
              <td>Rs. {product.price}</td>
              <td><span className="rounded-full bg-mint px-3 py-1 text-xs font-black text-ink">Live</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddProduct({
  categories,
  addSellerProduct,
  showToast,
}) {
  const [productData, setProductData] =
    useState({
      title: "",
      category: "",
      basePrice: "",
      description: "",
      careInstructions: "",
      returnPolicy: "",
      shippingInfo: "",
    });

  const [productImages, setProductImages] =
    useState([]);

  const [productVideo, setProductVideo] =
    useState(null);

  // PRODUCT VARIANTS
  const [variants, setVariants] = useState([
    {
      color: "",
      design: "",
      size: "",
      price: "",
      stock: "",
      image: null,
    },
  ]);

  const [saving, setSaving] =
    useState(false);

  const imagePreviews = useMemo(
    () =>
      productImages.map((image) =>
        URL.createObjectURL(image)
      ),
    [productImages]
  );

  // PRODUCT INPUT CHANGE
  const handleChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]:
        event.target.value,
    });
  };

  // ADD VARIANT
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        design: "",
        size: "",
        price: "",
        stock: "",
        image: null,
      },
    ]);
  };

  // REMOVE VARIANT
  const removeVariant = (index) => {
    const updated = [...variants];

    updated.splice(index, 1);

    setVariants(updated);
  };

  // UPDATE VARIANT
  const updateVariant = (
    index,
    field,
    value
  ) => {
    const updated = [...variants];

    updated[index][field] = value;

    setVariants(updated);
  };

  // SAVE PRODUCT
  const handleSaveProduct = () => {
    if (
      !productData.title.trim() ||
      !productData.category ||
      !productData.basePrice
    ) {
      showToast(
        "Complete product title, category and price"
      );

      return;
    }

    if (
      productImages.length < 5 ||
      productImages.length > 6
    ) {
      showToast(
        "Upload 5 to 6 product images"
      );

      return;
    }

    if (!productVideo) {
      showToast(
        "Upload one product demo video"
      );

      return;
    }

    setSaving(true);

    window.setTimeout(() => {
      addSellerProduct({
        title: productData.title,

        category: productData.category,

        price: productData.basePrice,

        description:
          productData.description,

        images: imagePreviews,

        video:
          URL.createObjectURL(
            productVideo
          ),

        // VARIANTS
        variants: variants.map(
          (variant) => ({
            ...variant,

            image: variant.image
              ? URL.createObjectURL(
                  variant.image
                )
              : null,
          })
        ),

        handmadeDetails:
          productData.careInstructions ||
          productData.description,

        estimatedDelivery:
          productData.shippingInfo ||
          "4-8 days",

        policy: {
          returnAvailable: true,

          returnDays: 7,

          refundRules:
            productData.returnPolicy ||
            "Seller policy applies.",
        },

        seller: {
          name: "Akriti Seller Studio",

          location: "India",

          verified: true,

          avatar: imagePreviews[0],

          rating: 0,

          story:
            productData.description,

          socials: {
            instagram: "#",

            website: "#",
          },
        },
      });

      setSaving(false);

      setProductData({
        title: "",
        category: "",
        basePrice: "",
        description: "",
        careInstructions: "",
        returnPolicy: "",
        shippingInfo: "",
      });

      setProductImages([]);

      setProductVideo(null);

      setVariants([
        {
          color: "",
          design: "",
          size: "",
          price: "",
          stock: "",
          image: null,
        },
      ]);

      showToast(
        "Product added successfully"
      );
    }, 500);
  };

  return (
    <div className="glass-card rounded-[30px] p-6">
      <h2 className="text-3xl font-black">
        Add product
      </h2>

      {/* PRODUCT INFO */}
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          name="title"
          placeholder="Product title"
          value={productData.title}
          onChange={handleChange}
          className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        />

        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="rounded-2xl bg-white/70 px-4 py-3 font-semibold capitalize outline-none dark:bg-white/10"
        >
          <option value="">
            Select category
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="basePrice"
          placeholder="Base price"
          value={productData.basePrice}
          onChange={handleChange}
          className="rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        />
      </div>

      {/* DESCRIPTION */}
      <textarea
        name="description"
        placeholder="Product description"
        value={productData.description}
        onChange={handleChange}
        className="mt-4 min-h-32 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
      />

      {/* PRODUCT IMAGES */}
      <div className="mt-10">
        <h3 className="mb-4 text-xl font-black">
          Product Images
        </h3>

        <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-pastelPink bg-white/60 px-4 py-6 font-black dark:bg-white/10">
          <FiUpload />

          Upload 5 to 6 images

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(event) =>
              setProductImages(
                Array.from(
                  event.target.files
                ).slice(0, 6)
              )
            }
            className="hidden"
          />
        </label>

        {/* PREVIEW */}
        <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {imagePreviews.map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="aspect-square w-full rounded-2xl object-cover"
              />
            )
          )}
        </div>
      </div>

      {/* PRODUCT VIDEO */}
      <div className="mt-8">
        <h3 className="mb-4 text-xl font-black">
          Product Demo Video
        </h3>

        <input
          type="file"
          accept="video/*"
          onChange={(event) =>
            setProductVideo(
              event.target.files?.[0] ||
                null
            )
          }
          className="w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        />

        {productVideo && (
          <p className="mt-3 rounded-2xl bg-white/60 p-4 text-sm font-bold dark:bg-white/10">
            {productVideo.name}
          </p>
        )}
      </div>

      {/* VARIANTS */}
      <div className="mt-10">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-black">
            Product Variants
          </h3>

          <button
            type="button"
            onClick={addVariant}
            className="rounded-2xl bg-pastelPink px-5 py-3 font-bold text-ink transition hover:scale-105"
          >
            + Add Variant
          </button>
        </div>

        <div className="space-y-5">
          {variants.map(
            (variant, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white/50 p-5 dark:bg-white/10"
              >
                <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">

                  {/* COLOR */}
                  <input
                    type="text"
                    placeholder="Color"
                    value={variant.color}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "color",
                        e.target.value
                      )
                    }
                    className="rounded-2xl px-4 py-3 font-semibold outline-none"
                  />

                  {/* DESIGN */}
                  <input
                    type="text"
                    placeholder="Design"
                    value={variant.design}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "design",
                        e.target.value
                      )
                    }
                    className="rounded-2xl px-4 py-3 font-semibold outline-none"
                  />

                  {/* SIZE */}
                  <input
                    type="text"
                    placeholder="Size"
                    value={variant.size}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "size",
                        e.target.value
                      )
                    }
                    className="rounded-2xl px-4 py-3 font-semibold outline-none"
                  />

                  {/* PRICE */}
                  <input
                    type="number"
                    placeholder="Variant price"
                    value={variant.price}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    className="rounded-2xl px-4 py-3 font-semibold outline-none"
                  />

                  {/* STOCK */}
                  <input
                    type="number"
                    placeholder="Stock"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "stock",
                        e.target.value
                      )
                    }
                    className="rounded-2xl px-4 py-3 font-semibold outline-none"
                  />

                  {/* IMAGE */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      updateVariant(
                        index,
                        "image",
                        e.target.files[0]
                      )
                    }
                    className="rounded-2xl bg-white px-3 py-3 font-semibold"
                  />
                </div>

                {/* VARIANT PREVIEW */}
                {variant.image && (
                  <div className="mt-4 flex items-center justify-between">
                    <img
                      src={URL.createObjectURL(
                        variant.image
                      )}
                      alt=""
                      className="h-24 w-24 rounded-2xl object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeVariant(index)
                      }
                      className="rounded-2xl bg-red-100 px-4 py-3 font-bold text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* POLICIES */}
      <div className="mt-10 grid gap-4">
        <textarea
          name="careInstructions"
          placeholder="Care instructions"
          value={
            productData.careInstructions
          }
          onChange={handleChange}
          className="min-h-24 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        />

        <textarea
          name="returnPolicy"
          placeholder="Return & exchange policy"
          value={productData.returnPolicy}
          onChange={handleChange}
          className="min-h-24 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        />

        <textarea
          name="shippingInfo"
          placeholder="Shipping & delivery information"
          value={productData.shippingInfo}
          onChange={handleChange}
          className="min-h-24 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10"
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSaveProduct}
        disabled={saving}
        className="pill-button mt-8 bg-ink text-white disabled:opacity-60 dark:bg-pastelPink dark:text-ink"
      >
        {saving
          ? "Saving..."
          : "Save Product"}
      </button>
    </div>
  );
}

function CategoriesSection({ sellerCategories, addSellerCategory }) {
  const [form, setForm] = useState({ name: "", description: "" });

  const submit = (event) => {
    event.preventDefault();
    if (addSellerCategory(form)) setForm({ name: "", description: "" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <form onSubmit={submit} className="glass-card rounded-[30px] p-6">
        <h2 className="text-2xl font-black">Create category</h2>
        <input placeholder="Category name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-5 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
        <textarea placeholder="Category description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-4 min-h-28 w-full rounded-2xl bg-white/70 px-4 py-3 font-semibold outline-none dark:bg-white/10" />
        <button className="pill-button mt-5 bg-ink text-white dark:bg-pastelPink dark:text-ink">Create category</button>
      </form>
      <div className="glass-card rounded-[30px] p-6">
        <h2 className="text-2xl font-black">Seller categories</h2>
        <div className="mt-5 grid gap-3">
          {sellerCategories.length ? sellerCategories.map((category) => (
            <div key={category.id} className="rounded-2xl bg-white/60 p-4 dark:bg-white/10">
              <p className="font-black capitalize">{category.name}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-200">{category.description || "No description added."}</p>
            </div>
          )) : <p className="rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">New seller categories will appear on homepage and shop filters.</p>}
        </div>
      </div>
    </div>
  );
}

function ListSection({ title, items }) {
  return (
    <div className="glass-card rounded-[30px] p-6">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item) => <p key={item} className="rounded-2xl bg-white/60 p-4 font-bold dark:bg-white/10">{item}</p>)}
      </div>
    </div>
  );
}
