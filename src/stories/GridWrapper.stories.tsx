import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { GridWrapper, IGridWrapperProps } from "../GridWrapper";

export default {
  title: "GridWrapper",
  component: GridWrapper,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as Meta;

const Template: Story<IGridWrapperProps> = (args) => <GridWrapper {...args} />;

export const Default = Template.bind({});
Default.args = {
  isInDesign: true,
  columnCount: 50,
  rowCount: 50,
  oldVersion: true,
  gridWidth: 900,
  gridHeight: 600,
};
