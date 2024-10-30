import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({ items }) => {
    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                {items?.map((item, index) => (
                    <li key={index}>
                        {index < items.length - 1 ? (
                            <>
                                <Link href={item.url} className="hover:!text-gray-900 transition-colors">
                                    {index !== 0 &&
                                    <>/ {" "}</>
                                    }
                                    {item.label}
                                </Link>
                            </>
                        ) : (
                            <>
                                <span className="font-medium text-gray-900"> <span>/ {" "}</span>{item.label}</span>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;


// import Link from 'next/link'

// const Breadcrumb = ({ currentPage, pagePath }) => {
//     const breadcrumbItems = [
//         { label: 'Home', href: '/' },
//         // { label: 'Blog', href: '/blog' },
//         { label: currentPage, href: pagePath },
//     ]

//     return (
//         <nav aria-label="Breadcrumb" className="mb-6">
//             <ol className="flex items-center space-x-2 text-sm text-gray-500">
//                 {breadcrumbItems.map((item, index) => (
//                     <li key={index}>
//                         {item.href ? (
//                             <Link href={item.href} legacyBehavior>
//                                 <a className="hover:text-gray-700 transition-colors">
//                                     {item.label}
//                                 </a>
//                             </Link>
//                         ) : (
//                             <span className="font-medium text-gray-900">
//                                 {item.label}
//                             </span>
//                         )}
//                         {index < breadcrumbItems.length - 1 && (
//                             <span className="mx-2">/</span>
//                         )}
//                     </li>
//                 ))}
//             </ol>
//         </nav>
//     )
// }

// export default Breadcrumb