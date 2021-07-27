package com.woowacourse.pickgit.unit.post.domain.comment;

import static org.assertj.core.api.Assertions.assertThatCode;

import com.woowacourse.pickgit.exception.post.CommentFormatException;
import com.woowacourse.pickgit.post.domain.comment.Comment;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

class CommentTest {

    @DisplayName("100자 이하의 댓글을 생성할 수 있다.")
    @Test
    void newComment_Under100Length_Success() {
        // given
        String content = "a".repeat(99);

        // when, then
        assertThatCode(() -> new Comment(content))
            .doesNotThrowAnyException();
    }

    @DisplayName("100자 초과의 댓글을 생성할 수 없다.")
    @Test
    void newComment_Over100Length_ExceptionThrown() {
        // given
        String content = "a".repeat(100);

        // when, then
        assertThatCode(() -> new Comment(content))
            .isInstanceOf(CommentFormatException.class)
            .extracting("errorCode")
            .isEqualTo("F0002");
    }

    @DisplayName("댓글은 null이거나 빈 문자열(공백만 있는 문자열 포함)이면 생성할 수 없다.")
    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {" ", "  "})
    void newComment_NullOrEmpty_ExceptionThrown(String content) {
        // when, then
        assertThatCode(() -> new Comment(content))
            .isInstanceOf(CommentFormatException.class)
            .extracting("errorCode")
            .isEqualTo("F0002");
    }
}
