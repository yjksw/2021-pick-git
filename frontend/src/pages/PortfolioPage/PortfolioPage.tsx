import { useRef } from "react";

import PageLoading from "../../components/@layout/PageLoading/PageLoading";
import PortfolioHeader from "../../components/@layout/PortfolioHeader/PortfolioHeader";
import ScrollActiveHeader from "../../components/@layout/ScrollActiveHeader/ScrollActiveHeader";
import Avatar from "../../components/@shared/Avatar/Avatar";
import DotPaginator from "../../components/@shared/DotPaginator/DotPaginator";
import PageError from "../../components/@shared/PageError/PageError";
import SVGIcon from "../../components/@shared/SVGIcon/SVGIcon";
import PortfolioProjectSection from "../../components/PortfolioProjectSection/PortfolioProjectSection";
import PortfolioSection from "../../components/PortfolioSection/PortfolioSection";
import PortfolioTextEditor from "../../components/PortfolioTextEditor/PortfolioTextEditor";
import useScrollPagination from "../../hooks/common/useScrollPagination";

import usePortfolio from "../../hooks/service/usePortfolio";
import useProfile from "../../hooks/service/useProfile";

import {
  AvatarWrapper,
  ContactIconCSS,
  ContactWrapper,
  Container,
  DescriptionCSS,
  DetailInfo,
  FullPage,
  PaginatorWrapper,
  SectionNameCSS,
  UserAvatarCSS,
  UserNameCSS,
} from "./PortfolioPage.style";

const PortfolioPage = () => {
  const username = new URLSearchParams(location.search).get("username") ?? "";
  const containerRef = useRef<HTMLDivElement>(null);

  const { portfolio: remotePortfolio, isError, isLoading: isPortfolioLoading, error } = usePortfolio(username);
  const { data: profile, isLoading: isProfileLoading } = useProfile(false, username);

  const paginationCount = remotePortfolio ? remotePortfolio.projects.length + remotePortfolio.sections.length + 1 : 0;
  const { activePageIndex, paginate } = useScrollPagination(containerRef, paginationCount);

  const handlePaginate = (index: number) => {
    paginate(index);
  };

  if (isProfileLoading || isPortfolioLoading) {
    return <PageLoading />;
  }

  if (!remotePortfolio || isError) {
    if (error?.response?.status === 400) {
      return (
        <>
          <PortfolioHeader isButtonsShown={false} />
          <PageError errorMessage="아직 포트폴리오가 만들어지지 않았습니다" />
        </>
      );
    }

    return <PageError errorMessage="포트폴리오 정보를 불러오는데 실패했습니다" />;
  }

  return (
    <>
      <ScrollActiveHeader containerRef={containerRef}>
        <PortfolioHeader isButtonsShown={false} />
      </ScrollActiveHeader>
      <Container ref={containerRef}>
        <FullPage isVerticalCenter={true}>
          <AvatarWrapper>
            {remotePortfolio.profileImageShown && (
              <Avatar
                diameter="6.5625rem"
                fontSize="1.5rem"
                imageUrl={remotePortfolio.profileImageUrl}
                cssProp={UserAvatarCSS}
              />
            )}
            <PortfolioTextEditor cssProp={UserNameCSS} value={remotePortfolio.name} disabled autoGrow={false} />
          </AvatarWrapper>
          <PortfolioTextEditor
            cssProp={DescriptionCSS}
            value={remotePortfolio.introduction}
            disabled
            autoGrow={false}
          />
          <ContactWrapper>
            <DetailInfo>
              <SVGIcon cssProp={ContactIconCSS} icon="CompanyIcon" />
              {profile?.company ? profile?.company : "-"}
            </DetailInfo>
            <DetailInfo>
              <SVGIcon cssProp={ContactIconCSS} icon="LocationIcon" />
              {profile?.location ? profile?.location : "-"}
            </DetailInfo>
            <DetailInfo>
              <SVGIcon cssProp={ContactIconCSS} icon="GithubDarkIcon" />
              <a href={profile?.githubUrl ?? ""}>{profile?.githubUrl ? profile?.githubUrl : "-"}</a>
            </DetailInfo>
            <DetailInfo>
              <SVGIcon cssProp={ContactIconCSS} icon="WebsiteLinkIcon" />
              <a href={profile?.website ?? ""}>{profile?.website ? profile?.website : "-"}</a>
            </DetailInfo>
            <DetailInfo>
              <SVGIcon cssProp={ContactIconCSS} icon="TwitterIcon" />
              {profile?.twitter ? profile?.twitter : "-"}
            </DetailInfo>
          </ContactWrapper>
        </FullPage>
        {remotePortfolio.projects.map((portfolioProject) => (
          <FullPage isVerticalCenter={true} key={portfolioProject.id}>
            <PortfolioProjectSection isEditable={false} project={portfolioProject} />
          </FullPage>
        ))}
        {remotePortfolio.sections.map((portfolioSection) => (
          <FullPage key={portfolioSection.id}>
            <PortfolioTextEditor cssProp={SectionNameCSS} value={portfolioSection.name} autoGrow={false} disabled />
            <PortfolioSection isEditable={false} section={portfolioSection} />
          </FullPage>
        ))}
      </Container>
      <PaginatorWrapper>
        <DotPaginator activePageIndex={activePageIndex} paginationCount={paginationCount} onPaginate={handlePaginate} />
      </PaginatorWrapper>
    </>
  );
};

export default PortfolioPage;
