import { useState } from "react";
import { FiCheck, FiDownload, FiEdit2, FiEye, FiFilter, FiSearch, FiSend, FiStar, FiTrash2, FiX } from "react-icons/fi";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { adminCustomers, adminOrders, adminProducts, adminReviews, adminSellers, categoryPerformance, deliveryProviders, notificationTemplates, revenueByMonth, revenueSummary } from "../data/adminMockData";

const pieColors = ["#4B1534", "#C6A972", "#8B5E3C", "#3E6B4D"];

function formatRupee(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }) {
  const tone = {
    Pending: "bg-amber-100 text-amber-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-indigo-100 text-indigo-800",
    Delivered: "bg-emerald-100 text-emerald-800",
    Cancelled: "bg-rose-100 text-rose-800",
    Approved: "bg-emerald-100 text-emerald-800",
    Published: "bg-emerald-100 text-emerald-800",
    Rejected: "bg-rose-100 text-rose-800",
    Active: "bg-emerald-100 text-emerald-800",
    Suspended: "bg-rose-100 text-rose-800",
    Connected: "bg-emerald-100 text-emerald-800",
    Disconnected: "bg-slate-100 text-slate-700"
  }[status] || "bg-slate-100 text-slate-700";
  return <span className={`rounded-full px-3 py-1 text-xs font-black ${tone}`}>{status}</span>;
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-3xl text-sm leading-6 text-text-secondary">{subtitle}</p>}
    </div>
  );
}

function AdminCard({ children, className = "" }) {
  return <div className={`rounded-[20px] border border-[rgba(75,21,52,0.10)] bg-white p-5 shadow-soft ${className}`}>{children}</div>;
}

function TableShell({ children }) {
  return <div className="overflow-x-auto rounded-[20px] border border-[rgba(75,21,52,0.10)] bg-white shadow-soft">{children}</div>;
}

function AdminTable({ columns, rows, renderRow }) {
  return (
    <TableShell>
      <table className="min-w-[760px] w-full text-left text-sm">
        <thead className="bg-surface-soft text-xs uppercase text-text-secondary">
          <tr>{columns.map((column) => <th key={column} className="px-4 py-3 font-black">{column}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-[rgba(75,21,52,0.08)]">{rows.map(renderRow)}</tbody>
      </table>
    </TableShell>
  );
}

function SearchFilter({ query, setQuery, filter, setFilter, filters = [] }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row">
      <label className="flex flex-1 items-center gap-3 rounded-full border border-[rgba(75,21,52,0.12)] bg-white px-4 py-3">
        <FiSearch className="text-accent" />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-full border-0 bg-transparent text-sm font-bold outline-none" />
      </label>
      {filters.length > 0 && (
        <label className="flex items-center gap-3 rounded-full border border-[rgba(75,21,52,0.12)] bg-white px-4 py-3">
          <FiFilter className="text-accent" />
          <select value={filter} onChange={(event) => setFilter(event.target.value)} className="border-0 bg-transparent text-sm font-bold outline-none">
            {filters.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      )}
    </div>
  );
}

export function AdminDashboardHome() {
  const metrics = [
    ["Total Revenue", formatRupee(revenueSummary.totalRevenue), "↑ 18% this month"],
    ["Today's Revenue", formatRupee(revenueSummary.todaysRevenue), "↑ 9% today"],
    ["Total Orders", revenueSummary.totalOrders, "↑ 24 new orders"],
    ["Pending Orders", revenueSummary.pendingOrders, "Needs attention"],
    ["Active Sellers", revenueSummary.activeSellers, "Verified sellers"],
    ["Pending Approvals", revenueSummary.pendingApprovals, "Seller + product queue"]
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Realistic mock analytics for revenue, orders, sellers, approvals, and marketplace performance." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value, trend]) => (
          <AdminCard key={label}>
            <p className="text-sm font-black uppercase text-text-secondary">{label}</p>
            <p className="mt-3 text-3xl font-black text-primary">{value}</p>
            <p className="mt-2 text-sm font-bold text-success">{trend}</p>
          </AdminCard>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <AdminCard className="xl:col-span-2">
          <h2 className="mb-5 text-xl font-black">Revenue by Month</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%"><LineChart data={revenueByMonth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#4B1534" strokeWidth={3} /></LineChart></ResponsiveContainer>
          </div>
        </AdminCard>
        <AdminCard>
          <h2 className="mb-5 text-xl font-black">Category Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={categoryPerformance} dataKey="value" nameKey="name" outerRadius={92} label>{categoryPerformance.map((entry, index) => <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
          </div>
        </AdminCard>
        <AdminCard className="xl:col-span-3">
          <h2 className="mb-5 text-xl font-black">Orders by Month</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={revenueByMonth}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="orders" fill="#C6A972" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer>
          </div>
        </AdminCard>
      </div>
    </>
  );
}

export function SellerApprovalsPage() {
  const [rows, setRows] = useState(adminSellers);
  const update = (id, status) => setRows((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  return (
    <>
      <PageHeader title="Seller Approvals" subtitle="Review new seller applications before stores can sell on PastelNest." />
      <AdminTable columns={["Seller Name", "Store Name", "Email", "Mobile", "Applied Date", "Status", "Actions"]} rows={rows} renderRow={(seller) => (
        <tr key={seller.id}>
          <td className="px-4 py-3 font-bold">{seller.name}</td><td className="px-4 py-3">{seller.storeName}</td><td className="px-4 py-3">{seller.email}</td><td className="px-4 py-3">{seller.mobile}</td><td className="px-4 py-3">{seller.appliedDate}</td><td className="px-4 py-3"><StatusBadge status={seller.status} /></td>
          <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => update(seller.id, "Approved")} className="pill-button bg-primary px-3 py-2"><FiCheck />Approve</button><button onClick={() => update(seller.id, "Rejected")} className="pill-button bg-white px-3 py-2"><FiX />Reject</button><button className="grid h-9 w-9 place-items-center rounded-full bg-surface-soft"><FiEye /></button></div></td>
        </tr>
      )} />
    </>
  );
}

export function ProductApprovalsPage() {
  const [rows, setRows] = useState(adminProducts.filter((item) => item.status !== "Published"));
  const update = (id, status) => setRows((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  return (
    <>
      <PageHeader title="Product Approvals" subtitle="Seller products remain pending until an admin approves them for publishing." />
      <AdminTable columns={["Image", "Product", "Seller", "Price", "Date", "Status", "Actions"]} rows={rows} renderRow={(product) => (
        <tr key={product.id}>
          <td className="px-4 py-3"><img src={product.images[0]} alt={product.title} className="h-14 w-14 rounded-xl object-cover" /></td><td className="px-4 py-3 font-bold">{product.title}</td><td className="px-4 py-3">{product.sellerName}</td><td className="px-4 py-3">{formatRupee(product.price)}</td><td className="px-4 py-3">{product.submittedDate}</td><td className="px-4 py-3"><StatusBadge status={product.status} /></td>
          <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => update(product.id, "Published")} className="pill-button bg-primary px-3 py-2"><FiCheck />Approve</button><button onClick={() => update(product.id, "Rejected")} className="pill-button bg-white px-3 py-2"><FiX />Reject</button><button className="grid h-9 w-9 place-items-center rounded-full bg-surface-soft"><FiEye /></button></div></td>
        </tr>
      )} />
    </>
  );
}

export function ProductsManagementPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = adminProducts.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()) && (filter === "All" || item.status === filter)).slice(0, 12);
  return (
    <>
      <PageHeader title="Products" subtitle="Search, filter, feature, edit, and remove marketplace products." />
      <SearchFilter query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} filters={["All", "Published", "Pending", "Rejected"]} />
      <AdminTable columns={["Image", "Product Name", "Seller", "Price", "Stock", "Category", "Status", "Actions"]} rows={rows} renderRow={(product) => (
        <tr key={product.id}>
          <td className="px-4 py-3"><img src={product.images[0]} alt={product.title} className="h-14 w-14 rounded-xl object-cover" /></td><td className="px-4 py-3 font-bold">{product.title}</td><td className="px-4 py-3">{product.sellerName}</td><td className="px-4 py-3">{formatRupee(product.price)}</td><td className="px-4 py-3">{product.stock}</td><td className="px-4 py-3 capitalize">{product.category}</td><td className="px-4 py-3"><StatusBadge status={product.status} /></td>
          <td className="px-4 py-3"><div className="flex gap-2"><button className="grid h-9 w-9 place-items-center rounded-full bg-surface-soft"><FiEye /></button><button className="grid h-9 w-9 place-items-center rounded-full bg-surface-soft"><FiEdit2 /></button><button className="grid h-9 w-9 place-items-center rounded-full bg-secondary/30"><FiStar /></button><button className="grid h-9 w-9 place-items-center rounded-full bg-rose-100 text-rose-700"><FiTrash2 /></button></div></td>
        </tr>
      )} />
      <div className="mt-4 flex justify-end gap-2"><button className="pill-button bg-white px-4 py-2">Prev</button><button className="pill-button bg-primary px-4 py-2">1</button><button className="pill-button bg-white px-4 py-2">Next</button></div>
    </>
  );
}

export function OrdersManagementPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const rows = adminOrders.filter((item) => [item.id, item.customer, item.seller].join(" ").toLowerCase().includes(query.toLowerCase()) && (filter === "All" || item.status === filter));
  return (
    <>
      <PageHeader title="Orders" subtitle="Track marketplace orders with searchable, sortable status views." />
      <SearchFilter query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} filters={["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"]} />
      <AdminTable columns={["Order ID", "Customer", "Seller", "Amount", "Date", "Status"]} rows={rows} renderRow={(order) => (
        <tr key={order.id}><td className="px-4 py-3 font-black">{order.id}</td><td className="px-4 py-3">{order.customer}</td><td className="px-4 py-3">{order.seller}</td><td className="px-4 py-3">{formatRupee(order.amount)}</td><td className="px-4 py-3">{order.date}</td><td className="px-4 py-3"><StatusBadge status={order.status} /></td></tr>
      )} />
    </>
  );
}

export function CustomersPage() {
  const [query, setQuery] = useState("");
  const rows = adminCustomers.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.phone.includes(query));
  return (
    <>
      <PageHeader title="Customers" subtitle="Manage customer profiles, order counts, and account status." />
      <SearchFilter query={query} setQuery={setQuery} />
      <AdminTable columns={["Customer Name", "Phone", "Orders", "Joined Date", "Status", "Actions"]} rows={rows} renderRow={(customer) => (
        <tr key={customer.id}><td className="px-4 py-3 font-bold">{customer.name}</td><td className="px-4 py-3">{customer.phone}</td><td className="px-4 py-3">{customer.orders}</td><td className="px-4 py-3">{customer.joinedDate}</td><td className="px-4 py-3"><StatusBadge status={customer.status} /></td><td className="px-4 py-3"><div className="flex gap-2"><button className="pill-button bg-white px-3 py-2">View</button><button className="pill-button bg-white px-3 py-2">Suspend</button><button className="pill-button bg-primary px-3 py-2">Delete</button></div></td></tr>
      )} />
    </>
  );
}

export function ReviewsPage() {
  const [rows, setRows] = useState(adminReviews);
  const update = (id, status) => setRows((items) => items.map((item) => item.id === id ? { ...item, status } : item));
  return (
    <>
      <PageHeader title="Reviews" subtitle="Moderate customer reviews before they appear across the marketplace." />
      <AdminTable columns={["Product", "Customer", "Rating", "Review", "Status", "Actions"]} rows={rows} renderRow={(review) => (
        <tr key={review.id}><td className="px-4 py-3 font-bold">{review.product}</td><td className="px-4 py-3">{review.customer}</td><td className="px-4 py-3">{review.rating}</td><td className="px-4 py-3">{review.review}</td><td className="px-4 py-3"><StatusBadge status={review.status} /></td><td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => update(review.id, "Approved")} className="pill-button bg-primary px-3 py-2">Approve</button><button onClick={() => update(review.id, "Hidden")} className="pill-button bg-white px-3 py-2">Hide</button><button className="pill-button bg-white px-3 py-2">Delete</button></div></td></tr>
      )} />
    </>
  );
}

export function NotificationsPage() {
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({ title: "", message: "", audience: "All Users", template: notificationTemplates[0] });
  const send = (event) => {
    event.preventDefault();
    setHistory((items) => [{ ...form, id: Date.now(), sentAt: new Date().toLocaleString() }, ...items]);
    setForm({ title: "", message: "", audience: "All Users", template: notificationTemplates[0] });
  };
  return (
    <>
      <PageHeader title="Notifications" subtitle="Send targeted updates to customers, sellers, or all users." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <AdminCard><form onSubmit={send} className="grid gap-4"><select value={form.template} onChange={(event) => setForm({ ...form, template: event.target.value, title: event.target.value })} className="rounded-2xl bg-surface-soft px-4 py-3 font-bold">{notificationTemplates.map((item) => <option key={item}>{item}</option>)}</select><input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Title" className="rounded-2xl bg-surface-soft px-4 py-3 font-bold" /><textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Message" className="min-h-32 rounded-2xl bg-surface-soft px-4 py-3 font-bold" /><select value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} className="rounded-2xl bg-surface-soft px-4 py-3 font-bold"><option>Customers</option><option>Sellers</option><option>All Users</option></select><button className="pill-button bg-primary"><FiSend />Send notification</button></form></AdminCard>
        <AdminCard><h2 className="mb-4 text-xl font-black">History</h2><div className="grid gap-3">{history.length ? history.map((item) => <div key={item.id} className="rounded-2xl bg-surface-soft p-4"><p className="font-black">{item.title}</p><p className="text-sm text-text-secondary">{item.audience} • {item.sentAt}</p><p className="mt-2 text-sm">{item.message}</p></div>) : <p className="text-sm font-bold text-text-secondary">No notifications sent yet.</p>}</div></AdminCard>
      </div>
    </>
  );
}

export function DeliveryPage() {
  return <><PageHeader title="Delivery" subtitle="Provider connections are ready for future logistics API integrations." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{deliveryProviders.map((provider) => <AdminCard key={provider.name}><h2 className="text-xl font-black">{provider.name}</h2><p className="mt-2 text-sm text-text-secondary">{provider.coverage}</p><div className="mt-4"><StatusBadge status={provider.status} /></div></AdminCard>)}</div></>;
}

export function ReportsPage() {
  const reports = ["Sales Report", "Orders Report", "Seller Report", "Customer Report"];
  return <><PageHeader title="Reports" subtitle="Generate and export operational marketplace reports." /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{reports.map((report) => <AdminCard key={report}><h2 className="text-xl font-black">{report}</h2><p className="mt-2 text-sm text-text-secondary">Includes dummy metrics for previews and testing.</p><div className="mt-5 flex flex-wrap gap-2">{["CSV", "Excel", "PDF"].map((type) => <button key={type} className="pill-button bg-white px-3 py-2"><FiDownload />{type}</button>)}</div></AdminCard>)}</div></>;
}

export function SimpleAdminPage({ title }) {
  return <><PageHeader title={title} subtitle={`${title} management is scaffolded with responsive empty states for the next integration step.`} /><AdminCard><p className="font-bold text-text-secondary">No records need attention right now.</p></AdminCard></>;
}
