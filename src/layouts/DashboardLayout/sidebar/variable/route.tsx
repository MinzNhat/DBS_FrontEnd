import { FaBox, FaUsers, FaUserCircle, FaAddressCard, FaBookOpen } from "react-icons/fa";
import { useTranslations } from 'next-intl';

const useRoutes = () => {
  const t = useTranslations('Routes');

  return [
    {
      name: t("orders"),
      layout: "/dashboard",
      path: "orders",
      icon: <FaBox className="h-4 w-4" />,
    },
    {
      name: t("products"),
      layout: "/dashboard",
      path: "products",
      icon: <FaBookOpen className="h-4.5 w-4.5" />,
    },
    {
      name: t("customer"),
      layout: "/dashboard",
      path: "customer",
      icon: <FaUserCircle className="h-4 w-4" />,
    },
    {
      name: t("staffs"),
      layout: "/dashboard",
      path: "staffs",
      icon: <FaUsers className="h-4 w-4" />,
    },
    {
      name: t("card"),
      layout: "/dashboard",
      path: "card",
      icon: <FaAddressCard className="h-4 w-4" />,
    },
  ];
};

export default useRoutes;