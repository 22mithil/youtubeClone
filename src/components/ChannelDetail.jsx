import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchFromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return <Box>
    <Box>
      <div style={{
background: 'linear-gradient(103deg, rgba(12,1,58,1) 0%, rgba(15,70,167,1) 14%, rgba(172,93,203,1) 28%, rgba(137,234,236,1) 42%, rgba(208,142,223,1) 56%, rgba(115,105,213,1) 70%, rgba(120,11,167,1) 84%, rgba(35,7,135,1) 100%)',zIndex:10,height:'300px'
}}/>
<ChannelCard channelDetail={channelDetail} marginTop="-110px"/>
    </Box>
    <Box display="flex" p="2">
      <Box sx={{mr:{sm:'100px'}}}/>
      <Videos videos={videos}/>
     
    </Box>
  </Box>;
};

export default ChannelDetail;
