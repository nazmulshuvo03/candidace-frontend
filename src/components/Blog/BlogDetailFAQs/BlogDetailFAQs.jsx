import { useState } from "react";
import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "@/components/Button/IconButton";

const BlogDetailFAQs = ({ faqs }) => {
    const [openFAQs, setOpenFAQs] = useState({});

    const toggleFAQ = (faqKey) => {
        setOpenFAQs((prevState) => ({
            ...prevState,
            [faqKey]: !prevState[faqKey],
        }));
    };

    return (
        <div
            className="py-6 md:py-16"
            style={{ paddingLeft: "5%", paddingRight: "5%" }}
        >
            <div className="pb-6">
                <div className="text-2xl md:text-4xl font-bold pb-4">FAQs</div>
                <div className="text-xs md:text-base font-medium">
                    Find answers to common questions about the service, interview
                    preparation, and technical requirements.
                </div>
            </div>
            <div className="py-6">
                {faqs.map((faq) => (
                    <div
                        key={faq._key}
                        className={`border-b border-text py-2 md:py-4 ${faq._key === 1 ? "border-t" : ""
                            }`}
                    >
                        <div
                            className={`flex items-center justify-between`}
                            onClick={() => toggleFAQ(faq._key)}
                        >
                            <div className="text-sm md:text-base font-medium">
                                {faq.question}
                            </div>
                            <IconButton>
                                <FontAwesomeIcon
                                    icon={openFAQs[faq._key] ? faAngleUp : faAngleDown}
                                    className="w-3 h-3 md:w-4 md:h-4 text-text"
                                />
                            </IconButton>
                        </div>
                        <div
                            className={`py-4 pl-4 text-xs md:text-sm font-light ${openFAQs[faq._key]
                                    ? `${styles.animateSlideDown}`
                                    : `${styles.animateSlideUp}`
                                }`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogDetailFAQs;