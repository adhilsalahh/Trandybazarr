export const statisticsChartsData = [
    {
      title: "Sales Over Time",
      data: [10, 20, 15, 30, 25, 40], // Example data
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      footer: "Updated 2 hours ago",
    },
    {
      title: "User Growth",
      data: [5, 10, 20, 40, 60, 80], // Example data
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
      footer: "Updated yesterday",
    },
    {
      title: "Order Completion",
      data: [75, 80, 85, 90, 95, 100], // Example data
      labels: ["Q1", "Q2", "Q3", "Q4"],
      footer: "Updated last week",
    },
  ];
  export const statisticsCardsData = [
    {
      title: "Total Visitors",
      value: "1,250",
      icon: () => <i className="fas fa-users"></i>, // Example icon
      footer: {
        value: "+15%",
        label: "Since last week",
        color: "text-green-500",
      },
    },
    {
      title: "Total Sales",
      value: "₹5,40,000",
      icon: () => <i className="fas fa-shopping-cart"></i>, // Example icon
      footer: {
        value: "-3%",
        label: "Since last month",
        color: "text-red-500",
      },
    },
    {
      title: "New Orders",
      value: "320",
      icon: () => <i className="fas fa-box"></i>, // Example icon
      footer: {
        value: "+10%",
        label: "Since yesterday",
        color: "text-green-500",
      },
    },
    {
      title: "Pending Issues",
      value: "8",
      icon: () => <i className="fas fa-exclamation-circle"></i>, // Example icon
      footer: {
        value: "+5%",
        label: "Since yesterday",
        color: "text-orange-500",
      },
    },
  ];
    