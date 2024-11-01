import React, { useRef, useState } from 'react';
// import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const FaqItem = ({ question, answer, isOpen, onClick }) => {
    const contentHeight = useRef(null);

    return (
        <div className="border-b border-gray-200 overflow-hidden">
            <button
                className={`
                    w-full text-left py-4 px-2 flex items-center gap-2 
                    font-semibold rounded-sm
                    ${isOpen ? 'text-secondary bg-[#00678c18] hover:hover:bg-[#00678c3a]' : ''}
                    hover:bg-[#00678c18] transition-all
                `}
                onClick={onClick}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    className={`
                        size-4 md:size-5 transition-transform duration-500 
                        ${isOpen ? 'rotate-45' : ''}
                    `}
                />
                <p>{question}</p>
            </button>

            <div
                ref={contentHeight}
                className="transition-[height] duration-500 ease-in-out overflow-hidden"
                style={
                    isOpen && contentHeight.current
                        ? { height: `${contentHeight.current.scrollHeight}px` }
                        : { height: "0px" }
                }
            >
                <p className="px-4 pl-8 pb-4 pt-2 text-gray-700">
                    {answer}
                </p>
            </div>
        </div>
    );
};

const BlogDetailFAQs = ({ faqs }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="max-w-800 w-90 mx-auto my-12 px-4 md:px-0">
            <h2 className="text-left text-2xl md:text-3xl font-bold mb-8">
                Do you have questions about the{" "}
                <br className="hidden md:block" />
                process?
            </h2>
            <div>
                {faqs.map((faq, index) => (
                    <FaqItem
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                        isOpen={activeIndex === index}
                        onClick={() => handleItemClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlogDetailFAQs;