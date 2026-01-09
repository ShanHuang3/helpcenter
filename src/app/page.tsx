import Card from "./_components/Card";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";

export default function Home() {
  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">
              歡迎使用 Aiia 營運管理平台
            </h2>
            <p className="text-m text-gray-600">數位人內容管理系統</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg mb-4 font-bold">快速存取</h3>

          <Card
            categoryTitle="快速入門"
            icon={<FaBookOpenReader className="w-5 h-5" />}
            items={[
              { title: "使用者指南", link: "/help/user-guide" },
              { title: "JSON 上傳指南", link: "/help/json-upload-guide" },
            ]}
            defaultItemsIcon={<IoIosArrowForward className="w-4 h-4" />}
          />
        </div>
      </div>
    </main>
  );
}
