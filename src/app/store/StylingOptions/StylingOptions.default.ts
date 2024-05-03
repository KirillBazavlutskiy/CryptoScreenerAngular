import {StylingOptionsModel} from "../../models/Options/StylingOptions.model";

export const DefaultStyingOptions: StylingOptionsModel = {
  upToPrice: {
    asks: [
      {
        value: 0,
        color: "#166534"
      },
      {
        value: 1,
        color: "#16a34a"
      },
      {
        value: 3,
        color: "#4ade80"
      }
    ],
      bids: [
      {
        value: 0,
        color: "#991b1b"
      },
      {
        value: 1,
        color: "#dc2626"
      },
      {
        value: 3,
        color: "#f87171"
      }
    ]
  },
  solidityRatio: [
    {
      value: 10,
      color: "#60a5fa"
    },
    {
      value: 15,
      color: "#2563eb"
    },
    {
      value: 20,
      color: "#1e40af"
    }
  ]
}
