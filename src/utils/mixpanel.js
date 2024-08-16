import mixpanel from "mixpanel-browser";
import { config } from "../../.config";

mixpanel.init(config.MIXPANEL_TOKEN, {
  debug: true,
  // track_pageview: true,
  persistence: "localStorage",
});

/**
 *
 * @param {name, data, id}
 * name: Event Name,
 * data: Additional Data,
 * id: Unique Identifier
 */
export const MIXPANEL_TRACK = ({ name = "", data = {}, id = "" }) => {
  mixpanel.identify(id);
  mixpanel.track(name, data);
};
