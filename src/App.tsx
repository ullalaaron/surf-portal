import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "./contracts/surfSpots.json";
import Container from "@mui/material/Container";
import SurfSpotForm from "./components/SurfSpotForm";
import "./external/Firebase";
import { SurfSpots } from "./components/SurfSpots";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useAppDispatch } from "./store/store.hooks";
import { setAllSurfSpots } from "./slices/SurfSpots.slice";
import { SurfSpotDto } from "./components/SurfSpot";
import { useSelector } from "react-redux";
import { getLoadingSelector, setLoading } from "./slices/Loading.slice";
import {
  getNotificationSelector,
  setNotification,
} from "./slices/Notification.slice";
import { Notification } from "./components/Notification";
import { allowedNodeEnvironmentFlags } from "process";

enum MenuItemAction {
  ConnectWallet = 1,
  DisconnectWallet,
  SubmitSurfSpot,
}
interface MyMenuItem {
  text: string;
  id: MenuItemAction;
}

function App() {
  /*
   * Just a state variable we use to store our user's public wallet.
   */
  const [openModal, setOpenModal] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [menuActions, setMenuActions] = useState<MyMenuItem[]>([]);
  const contractAddress = "0x4Dc6d170A057568dc2178e1b45431Fa199fEFf9A";
  const contractAbi = abi;
  const dispatch = useAppDispatch();

  const isLoading = useSelector(getLoadingSelector);
  const notification = useSelector(getNotificationSelector);

  const handlMenuAction = (item?: MyMenuItem) => {
    if (item?.id) {
      switch (item.id) {
        case MenuItemAction.ConnectWallet:
          console.log("Connecting Wallet");
          connectWallet();
          break;
        case MenuItemAction.DisconnectWallet:
          console.log("Disconnecting Wallet");
          break;
        case MenuItemAction.SubmitSurfSpot:
          console.log("Submitting Surf Spot");
          setOpenModal(true);
          break;
      }
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        handleEthAccount(accounts[0]);
      } else {
        setMenuActions([
          { text: "Connect Wallet", id: MenuItemAction.ConnectWallet },
        ]);
        console.log("No authorized account found");
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts", accounts);
      handleEthAccount(accounts[0]);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleEthAccount = (account: any) => {
    setCurrentAccount(account);
    getAllSurfSpots();
    setMenuActions([
      { text: "Submit Surf Sport", id: MenuItemAction.SubmitSurfSpot },
      { text: "Disconnect Wallet", id: MenuItemAction.DisconnectWallet },
    ]);
  };

  const getAllSurfSpots = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const surfSpotsContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const surfSpots = await surfSpotsContract.getAllSurfSpots();
        surfSpotsContract.on("SurfSpotSubmitted", (event: any) => {
          console.log("SurfSpotSubmitted", event);
        });
        const mappedSurdSpots: SurfSpotDto[] = surfSpots.map((item: any) => ({
          name: item.spotName,
          description: item.spotDescription,
          imageUrl: item.spotImageUrl,
          surfer: item.surfer,
        }));
        dispatch(setAllSurfSpots(mappedSurdSpots));
      }
    } catch (e: any) {
      dispatch(setNotification(`Error occured: ${e?.message || e}`));
      console.error(e);
    }
  };

  async function submitSurfSpot(item: SurfSpotDto) {
    setOpenModal(false);
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      dispatch(setLoading(true));
      dispatch(setNotification("Starting transaction..."));

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const portalContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      let count = await portalContract.getSurfSpotsCount();
      dispatch(setNotification(`Currently there are ${count} spots  `));

      const submitTxn = await portalContract.submitSurfSpot(
        item.name,
        item.description,
        item.imageUrl
      );
      dispatch(setLoading(false));
      dispatch(setNotification(`Mining Transaction`));

      await submitTxn.wait();
      dispatch(setNotification(`Transaction Mined - Hash: ${submitTxn.hash}`));

      count = await portalContract.getSurfSpotsCount();
      dispatch(setNotification(`There are now ${count} spots 🎉`));
    } catch (e: any) {
      dispatch(setNotification(`Error occured: ${e?.message || e}`));
      dispatch(setLoading(false));
      dispatch(setNotification(e?.message.toString() || e?.toString()));
      console.error(e);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <Container maxWidth="lg">
      <div className="mainContainer">
        <div className="dataContainer">
          <AppBar position="static">
            <Container maxWidth="lg">
              <Toolbar disableGutters>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  🏄
                </Typography>
                {menuActions.map((page) => (
                  <Button
                    key={page.id}
                    color="inherit"
                    onClick={() => handlMenuAction(page)}
                  >
                    {page.text}
                  </Button>
                ))}
              </Toolbar>
            </Container>
          </AppBar>
          {isLoading && <LoadingIndicator></LoadingIndicator>}
          {notification?.id && (
            <Notification message={notification.message}></Notification>
          )}
          <SurfSpots></SurfSpots>
          <SurfSpotForm
            open={openModal}
            onClose={submitSurfSpot}
            submitterAddress={currentAccount}
          ></SurfSpotForm>
        </div>
      </div>
    </Container>
  );
}

export default App;
