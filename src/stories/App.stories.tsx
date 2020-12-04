import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import App from "../App";

export default {
  title: "App",
  component: App,
  argTypes: {},
} as Meta;

const Template: Story<any> = (args) => <App {...args} />;

export const Default = Template.bind({});
Default.args = {
  isInDesign: true,
  columnCount: 50,
  rowCount: 50,
  oldVersion: true,
};
