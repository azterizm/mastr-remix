import { Link } from "@remix-run/react";

const PageTitle = (props: { title: string }) => (
  <Link to='/' className="flex items-center gap-4 mb-8 relative">
    <button className="btn btn-neutral">Go back</button>
    <h1 className="absolute top-0 left-1/2 -translate-x-1/2 text-5xl">{props.title}</h1>
  </Link>
);

export default PageTitle;
