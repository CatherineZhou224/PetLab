import { DogInfo } from "./DogInfo";
import { CatInfo } from "./CatInfo";
import DogIcon from "./DogIcon";
import CatIcon from "./CatIcon";
import { Tabs } from "antd";
const Tab = ({
  activeTab,
  setActiveTab,
  addToDogCollection,
  removeDogCollection,
  dogCollection,
  updateCollectionName,
  isOpen,
  setIsOpen,
  selectedCollectionPet,
  searchBarText,
  addToCatCollection,
  removeCatCollection,
  catCollection,
}) => {
  const { TabPane } = Tabs;
  //Function to switch tabs between Dogs and Cats sections
  const handleTabChange = () => {
    setActiveTab((prev) => (prev === "1" ? "2" : "1"));
  };
  return (
    <Tabs
      destroyInactiveTabPane="true"
      activeKey={activeTab}
      onChange={handleTabChange}
    >
      <TabPane
        tab={
          <>
            <DogIcon style={{ marginRight: "0.5rem" }} />
            Dogs
          </>
        }
        key="1"
      >
        <DogInfo
          activeTab={activeTab}
          addToDogCollection={addToDogCollection}
          removeDogCollection={removeDogCollection}
          dogCollection={dogCollection}
          updateCollectionName={updateCollectionName}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCollectionDog={selectedCollectionPet}
          searchBarText={searchBarText}
        />
      </TabPane>
      <TabPane
        tab={
          <>
            <CatIcon style={{ marginRight: "0.5rem" }} />
            Cats
          </>
        }
        key="2"
      >
        <CatInfo
          addToCatCollection={addToCatCollection}
          removeCatCollection={removeCatCollection}
          catCollection={catCollection}
          updateCollectionName={updateCollectionName}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCollectionCat={selectedCollectionPet}
          searchBarText={searchBarText}
        />
      </TabPane>
    </Tabs>
  );
};

export default Tab;
