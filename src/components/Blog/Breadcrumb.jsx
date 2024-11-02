import React from "react";
import Link from "next/link";

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm text-gray-500">
        {items?.map((item, index) => (
          <li key={index} className="flex items-center">
            {index < items.length - 1 ? (
              <>
                <Link
                  href={item.url}
                  className="hover:!text-gray-900 transition-colors break-words"
                >
                  {index !== 0 && <span className="mx-2">/ </span>}
                  {item.label}
                </Link>
              </>
            ) : (
              <>
                <span className="font-medium text-gray-900 break-words">
                  <span className="mx-2">/ </span>
                  {item.label}
                </span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
