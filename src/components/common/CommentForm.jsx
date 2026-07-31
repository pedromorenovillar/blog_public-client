import { useState } from "react";

function CommentForm({ authorId, postId }) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState([]);

  // Convert errors array to object
  const fieldErrors = Object.fromEntries(
    errors.map(({ path, msg }) => [path, msg]),
  );

  function handleChange(event) {
    setContent(event.target.value);

    // Clear the textarea after a successful submit
    setErrors((prevErrors) => {
      return prevErrors.filter((error) => error.path !== "content");
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      console.log("form submits the following: ");
      console.log({ content });
      console.log({ authorId });
      console.log({ postId });
      setContent("");
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors([{ msg: error.message }]);
      }
    }
    return;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {fieldErrors.content && <p>{fieldErrors.content}</p>}
        <input type="hidden" name="authorId" value={authorId} />
        <input type="hidden" name="postId" value={postId} />
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          value={content}
          onChange={handleChange}
        ></textarea>
        <button type="submit" disabled={isSending}>
          Send
        </button>
      </form>
    </>
  );
}
export default CommentForm;
