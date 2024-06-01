import React, { useContext, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import ActiveSaleorders from "./modules/ActiveSaleorders";
import CompletedSaleOrders from "./modules/CompletedSaleOrders";
import Btn from "../../common/Btn";
import { AddIcon } from "@chakra-ui/icons";
import ThemeContext from "../../context/ThemeProvider";
import SaleOrderModal from "../../modals/SaleOrderForm";
import Loaders from "../../common/Loaders";
import {useGetProducts} from "../../../Hooks/useGetProducts.js"

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const [showSaleOrderModal, setSaleOrderModal] = useState(false);
  const { data, isLoading, isError } =useGetProducts();

  const handleshowModal = () => {
    setSaleOrderModal(true);
  };

 


  if (isLoading) {
    return (
      <Loaders/>
    )
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }


  return (
    <div style={{ width: "100%", background: theme,  height:"100%"}}>
      <Tabs>
        <TabList>
          <Flex
            justifyContent={"space-evenly"}
            alignItems="center"
            w="100%"
            flexDirection={"row"}
            flexWrap={"wrap"}
          >
            <Tab>
              <em style={{ color: theme == "#2e3c3ff1" ? "#81E6D9" : "black" }}>
                Activesaleorders
              </em>
            </Tab>
            <Tab>
              <em style={{ color: theme == "#2e3c3ff1" ? "#81E6D9" : "black" }}>
                Completedsaleorders
              </em>
            </Tab>
            <Btn
              color={"teal"}
              size={"md"}
              variant="ghost"
              onClick={handleshowModal}
            >
              <AddIcon mr={2} w={2} h={4} color="blue.500" />
              <strong> SalesOrder</strong>
            </Btn>
          </Flex>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveSaleorders />
          </TabPanel>
          <TabPanel>
            <CompletedSaleOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {showSaleOrderModal && data && (
        <SaleOrderModal
          isOpen={showSaleOrderModal}
          closeModal={() => setSaleOrderModal(false)}
          data={data}
        />
      )}
    </div>
  );
}
