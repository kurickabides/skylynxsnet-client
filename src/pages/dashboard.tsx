import React, { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { FlexRowBetween } from "../theme/appStyles"; // theme styles
import PageTitle from "../components/ui/pageTitle";
import { APP_TITLE, PAGE_TITLE_DASHBOARD } from "../helpers/constants";

const Dashboard: FC = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_DASHBOARD} | {APP_TITLE}
        </title>
      </Helmet>
      <FlexRowBetween>
        <PageTitle title={PAGE_TITLE_DASHBOARD} />
      </FlexRowBetween>
    </>
  );
};

export default Dashboard;
