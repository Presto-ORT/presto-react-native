import axios from "axios";

const getExample = async () => {
    const url = "https://api2.binance.com/api/v3/ticker/24hr";
    return await axios.get(url)
}

export { getExample }