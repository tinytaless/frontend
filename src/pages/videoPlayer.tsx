import { useRef } from "react";
import Plyr, { APITypes } from "plyr-react";
import "plyr-react/dist/plyr.css";

let videoId = "";
const provider = "youtube";
const videoOptions = undefined;

export interface IVideoPlayer {
  url: string;
}

const PlyrComponent: React.FC<IVideoPlayer> = ({ url }) => {
  const ref = useRef<APITypes>(null);
  videoId = url;

  const plyrVideo =
    videoId && provider ? (
      <Plyr
        ref={ref}
        source={{
          type: "video",
          sources: [
            {
              src: videoId,
              provider: provider
            }
          ]
        }}
        options={videoOptions}
      />
    ) : null;

  return (
    <div>
      {plyrVideo}
    </div>
  );
};

export default PlyrComponent;
