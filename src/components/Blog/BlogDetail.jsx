import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { PortableText } from '@portabletext/react';
import { portableTextComponents } from "./portable-text-components";
import { useEffect, useRef, useState } from "react";
import { dateFormat } from "@/utils/blog";
import Link from "next/link";
import BlogDetailFAQs from "./BlogDetailFAQs/BlogDetailFAQs";
import Breadcrumb from "./Breadcrumb";

// Helper function to create slug from heading text
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, '-');
};

// Extract headings from content
const extractTableOfContents = (content) => {
  return content
    .filter(block => ['h1', 'h2', 'h3', 'h4'].includes(block.style))
    .map(heading => ({
      text: heading.children[0].text,
      level: parseInt(heading.style.charAt(1)),
      slug: createSlug(heading.children[0].text),
    }));
};

export default function BlogDetail({ blog }) {
  const items = [
    { label: 'Home', url: '/' },
    { label: 'Blog', url: '/blog' },
    { label: `${blog.title}`, url: `/blog/${blog.slug}` },
  ];
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    // Extract table of contents when component mounts
    const extractedToc = extractTableOfContents(blog.content);
    setToc(extractedToc);

    // Add IDs to heading elements for smooth scrolling
    const addHeadingIds = () => {
      const article = document.querySelector('.blog-content');
      const headings = article.querySelectorAll('h1, h2, h3, h4');
      headings.forEach(heading => {
        heading.id = createSlug(heading.textContent);
      });
    };

    // Setup intersection observer for active section highlighting
    const observeHeadings = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        },
        { rootMargin: '0px 0px -80% 0px' }
      );

      const headings = document.querySelectorAll('h1, h2, h3, h4');
      headings.forEach(heading => observer.observe(heading));

      return observer;
    };

    addHeadingIds();
    const observer = observeHeadings();

    return () => observer.disconnect();
  }, [blog.content]);

  const faqs = useRef(null);

  const handleTocClick = (slug) => {
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (slug === 'faqs' && faqs.current) {
      faqs.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <Breadcrumb items={items} />
      <div>
        <Image
          src={urlFor(blog.mainImage).url()}
          alt={blog.title}
          width={400}
          height={400}
          quality={100}
          priority={true}
          className="w-full h-auto max-h-96 object-cover rounded-2xl border border-gray-100 shadow-sm"
        />
        <h1 className="text-4xl font-bold my-7">{blog.title}</h1>
      </div>
      <BlogMetadata blog={blog} />

      {/* Main content container */}
      <div className="relative flex gap-10">
        {/* Sidebar container */}
        <div className="hidden lg:block w-72">
          {/* Sticky sidebar wrapper */}
          <div className="sticky top-4 border border-[#e5e7eb] rounded-lg shadow-sm">
            <nav className="p-5 rounded-lg">
              {/* Fixed Header */}
              <div>
                <h2 className="text-xl font-semibold">Table of Contents</h2>
                <hr className="mt-2 mb-5" />
              </div>

              {/* Scrollable Content */}
              <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                <ul className="space-y-2">
                  {toc.map((heading, index) => (
                    <li
                      key={index}
                      style={{ paddingLeft: `${(heading.level - 1) * 0.5}rem` }}
                    >
                      <a
                        href={`#${heading.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleTocClick(heading.slug);
                        }}
                        className={`block py-1 text-sm hover:text-[#00668C] transition-colors
                        ${activeSection === heading.slug
                            ? 'text-[#00668C] font-medium'
                            : 'text-gray-600'}`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                  <li className="pl-2">
                    <a
                      href="#faqs"
                      onClick={(e) => {
                        e.preventDefault();
                        handleTocClick('faqs');
                      }}
                      className="block py-1 text-sm hover:text-[#00668C] transition-colors"
                    >
                      FAQs
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <article className="min-w-0 flex-1 blog-content rounded-lg prose prose-lg max-w-none">
          <PortableText
            value={blog.content}
            components={portableTextComponents}
          />
          <div ref={faqs}>
            <BlogDetailFAQs faqs={blog.faqs} />
          </div>
        </article>
      </div>
    </div>
  );
}

const BlogMetadata = ({ blog }) => {
  return (
    <div className="flex items-center gap-y-4 gap-x-10 lg:gap-x-14 xl:gap-x-20 flex-wrap text-sm text-gray-500 mb-10">
      <MetadataItem
        label="Author"
        value={
          <Link href={`/blog/author/${blog.author.slug}`} className="flex gap-2 items-center">
            <span>{blog.author.username || "Unknown Author"}</span>
          </Link>
        }
      />
      <MetadataItem
        label="Published"
        value={<span>{dateFormat(blog.publishedAt)}</span>}
      />
      <MetadataItem
        label="Last Updated"
        value={<span>{dateFormat(blog.updatedAt)}</span>}
      />
      <MetadataItem
        label="Estimated Reading Time"
        value={<span>{blog.estimatedReadingTime} minutes</span>}
      />
    </div>
  );
};

const MetadataItem = ({ label, value }) => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-gray-600 font-semibold text-sm sm:text-base">{label}: </span>
      <div className="text-sm font-medium text-gray-500 mt-0.5">{value}</div>
    </div>
  );
};