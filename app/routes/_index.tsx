import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Search } from "lucide-react";
import Header from "~/components/Header";
import { items } from "~/utils/data";

export const meta: MetaFunction = () => {
  return [
    { title: "Mastr | Documents" },
    { name: "description", content: "Welcome to Mastr" },
  ];
};

export default function Index() {

  return (
    <div className="container mx-auto pt-8 min-h-screen flex flex-col px-4">
      <Header/>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl">Documents</h1>
        <button className="btn btn-ghost btn-lg">
          <Search size={36} />
        </button>
      </div>
      <Link to='/create' className="my-4 btn btn-lg btn-neutral btn-block">Create</Link>
      <div className="flex-1 overflow-y-auto flex flex-col gap-8 items-center">
        {items(20).map(r => (
          <div key={r} className="card bg-base-100 w-full shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Sunshine Academy</h2>
              <p>MCQs</p>
              <p>5 seconds ago</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary btn-outline">Download</button>
                <button className="btn btn-primary">Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="btm-nav">
        <button className="text-primary active">
          Documents
        </button>
        <button className="text-primary">
          Settings
        </button>
      </div>
    </div>
  );
}

