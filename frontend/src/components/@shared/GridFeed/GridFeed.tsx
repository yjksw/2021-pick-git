import { InfiniteData } from "react-query";
import { Link } from "react-router-dom";
import { Post } from "../../../@types";
import { getPostsFromPages } from "../../../utils/feed";

import PageLoading from "../../@layout/PageLoading/PageLoading";
import InfiniteScrollContainer from "../InfiniteScrollContainer/InfiniteScrollContainer";
import { Container, Empty, Grid, GridItem } from "./GridFeed.styled";

export interface Props {
  feedPagePath?: string;
  infinitePostsData?: InfiniteData<Post[] | null>;
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  handleIntersect: () => void;
}

const GridFeed = ({
  feedPagePath,
  infinitePostsData,
  isLoading,
  isError,
  isFetchingNextPage,
  handleIntersect,
}: Props) => {
  if (isLoading) {
    return (
      <Empty>
        <PageLoading />
      </Empty>
    );
  }

  if (isError || !infinitePostsData) {
    return <div>피드를 가져올 수 없습니다.</div>;
  }

  const posts = getPostsFromPages(infinitePostsData.pages);

  const Feed = () => {
    if (posts.length > 0) {
      return (
        <Container>
          <InfiniteScrollContainer
            isLoaderShown={isFetchingNextPage ?? false}
            onIntersect={handleIntersect ?? (() => {})}
          >
            <Grid>
              {posts?.map(({ id, imageUrls, authorName, content }) => (
                <Link
                  to={{
                    pathname: feedPagePath?.split("?")[0] ?? "",
                    search: `?${feedPagePath?.split("?")[1]}`,
                    state: { prevData: infinitePostsData, postId: id },
                  }}
                  key={id}
                >
                  <GridItem imageUrl={imageUrls[0]} aria-label={`${authorName}님의 게시물. ${content}`} />
                </Link>
              ))}
            </Grid>
          </InfiniteScrollContainer>
        </Container>
      );
    } else {
      return <Empty>게시물이 없습니다.</Empty>;
    }
  };

  return <Feed />;
};

export default GridFeed;