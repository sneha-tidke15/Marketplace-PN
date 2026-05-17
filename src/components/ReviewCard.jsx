import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  return (
    <article className="glass-card rounded-[26px] p-5">
      <RatingStars rating={review.rating} />
      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-200">"{review.text}"</p>
      <p className="mt-4 font-black">{review.name || review.user}</p>
    </article>
  );
}
