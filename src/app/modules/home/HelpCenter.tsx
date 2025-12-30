import InputBox from "../../components/InputBox";
import Card from "./Card";
import { IoIosArrowForward } from "react-icons/io";
import { FaBookOpenReader } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";
import { RiExternalLinkLine } from "react-icons/ri";

export default function HelpCenter() {
  const cardData = [
    {
      categoryTitle: "快速入門",
      icon: <FaBookOpenReader className="w-5 h-5" />,
      items: [
        { title: "使用者指南", link: "/help/user-guide" },
        { title: "JSON 上傳指南", link: "/help/json-upload-guide" },
      ],
      itemsIcon: <IoIosArrowForward className="w-4 h-4" />,
    },
    {
      categoryTitle: "管理您的帳號",
      icon: <FaCircleUser className="w-5 h-5" />,
      items: [{ title: "設定指南", link: "/help/settings-guide" }],
      itemsIcon: <IoIosArrowForward className="w-4 h-4" />,
    },
    {
      categoryTitle: "YouTube",
      icon: <FaYoutube className="w-5 h-5" />,
      items: [
        { title: "使用者指南-影片教學", href: "https://www.youtube.com/" },
        { title: "JSON 上傳指南-影片教學", href: "https://www.youtube.com/" },
      ],
      itemsIcon: <RiExternalLinkLine className="w-4 h-4" />,
    },
    {
      categoryTitle: "系統配置",
      icon: <FaCog className="w-5 h-5" />,
      items: [{ title: "自動化指南", link: "/help/automation-guide" }],
      itemsIcon: <IoIosArrowForward className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-full bg-[var(--color-background-gray)] flex flex-col items-center justify-start pt-16 px-4">
      <div className="w-full max-w-2xl mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          幫助中心
        </h1>
      </div>
      <InputBox />
      <div className="grid grid-cols-3 gap-6 justify-center items-center my-12 mx-auto">
        {cardData.map((card, index) => (
          <Card
            key={index}
            categoryTitle={card.categoryTitle}
            icon={card.icon}
            items={card.items}
            defaultItemsIcon={card.itemsIcon}
          />
        ))}
      </div>
    </div>
  );
}
