"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const listItem = ["Home", "Movies", "Series", "Music"];
    const activeIndex = 0;

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    

    return (
        <div className={`fixed px-10 h-25 z-10 w-full flex items-center justify-between ${!isVisible ? 'bg-[#00000000]' : 'bg-[#020916] transition-all duration-350'}`}>
            <ul className="flex p-12">
                {listItem.map((item, i) => (
                    <li key={i} className={`p-5 text-soft-grey font-semibold`}>
                        <Link href={"#"} className={`${i === activeIndex ? "text-white" : "text-soft-grey"} `} style={{ textDecoration: "none" }}>
                            {item}
                        </Link>
                    </li>
                ))}
            </ul>
            <input type="text" placeholder="Search..." className="rounded-xl top-0 right-0 h-12 text-white bg-dark-grey p-3 w-50 flex items-end justify-end mt-2" />

            {/* <input type="text" placeholder="hello" className="top-0 bg-white" /> */}
        </div>
    )
}
