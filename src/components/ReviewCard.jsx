import RatingStars from "./RatingStars";

export default function ReviewCard({ review, highlight = false }) {
  return (
    <article className={`glass-card rounded-[26px] p-5 ${highlight ? "ring-2 ring-emerald-200 dark:ring-emerald-500/40" : ""}`}>
      {review.image && <img src={review.image} alt={review.name || review.user} loading="lazy" className="mb-4 h-24 w-full rounded-2xl object-cover" />}
      <RatingStars rating={review.rating} />
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-200">"{review.text}"</p>
      <p className="mt-4 font-black">{review.name || review.user}</p>
      {review.role && <p className="text-xs font-bold uppercase text-rose-500">{review.role}</p>}
    </article>
  );
}
