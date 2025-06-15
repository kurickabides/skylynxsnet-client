import React, { FC, ReactElement } from "react";
import { Helmet } from "react-helmet";
import { APP_TITLE, PAGE_TITLE_AUTH } from "../helpers/constants";
import PageTitle from "../components/ui/pageTitle";
import AuthForm from "../components/auth/authForm";
import { FlexRowBetween } from "../theme/appStyles";

const AuthPage: FC = (): ReactElement => {
  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_AUTH} | {APP_TITLE}
        </title>
      </Helmet>
      <FlexRowBetween>
        <PageTitle title={PAGE_TITLE_AUTH} />
      </FlexRowBetween>
      <AuthForm />
    </>
  );
};

export default AuthPage;
