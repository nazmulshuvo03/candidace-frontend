import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-bash';

export const portableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-4 text-sm xl:text-base 2xl:text-lg !leading-relaxed">{children}</p>,
        h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-2xl font-semibold mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xl font-medium mb-2">{children}</h3>,
        h4: ({ children }) => <h4 className="text-lg font-medium mb-2">{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 !leading-relaxed text-sm xl:text-base 2xl:text-lg">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-5 mb-4 !leading-relaxed text-sm xl:text-base 2xl:text-lg">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="mb-2 text-sm xl:text-base 2xl:text-lg">{children}</li>,
        number: ({ children }) => <li className="mb-2 text-sm xl:text-base 2xl:text-lg">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        underline: ({ children }) => <span className="underline">{children}</span>,
        link: ({ value, children }) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="text-blue-600 hover:underline">
                    {children}
                </a>
            )
        },
    },
    types: {
        image: ({ value }) => {
            return (
                <div className="my-8 relative flex flex-col items-center">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Blog image'}
                        width={800}
                        height={500}
                        quality={100}
                        className="w-full h-auto rounded-lg"
                    />
                    {value.caption && (
                        <div className="text-center text-gray-500 mt-2 text-sm">
                            {value.caption}
                        </div>
                    )}
                </div>
            )
        },
        codeBlock: ({ value }) => {
            useEffect(() => {
                Prism.highlightAll();
            }, [value.code]);

            return (
                <div className="my-4">
                    <pre className="rounded-lg overflow-hidden [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                        <code className={`language-${value.language || 'javascript'}`}>
                            {value.code}
                        </code>
                    </pre>
                </div>
            );
        }
    }
};