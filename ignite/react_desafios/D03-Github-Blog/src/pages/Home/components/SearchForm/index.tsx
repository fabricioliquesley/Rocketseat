import { InputHTMLAttributes, useContext } from "react";
import { InputContainer } from "./styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostsContext } from "../../../../contexts/postsContext";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const SearchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof SearchFormSchema>;

export function SearchForm({ placeholder, ...rest }: InputProps) {
  const { fetchIssues } = useContext(PostsContext);

  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(SearchFormSchema),
  });

  async function handleSearchFormSubmit(data: SearchFormInputs) {
    await fetchIssues(`${data.query}%20`);
  }

  async function handleSearchFormBlur(data: SearchFormInputs) {
    if (data.query == "") {
      return await fetchIssues();
    }

    return;
  }

  return (
    <InputContainer
      onSubmit={handleSubmit(handleSearchFormSubmit)}
      onBlur={handleSubmit(handleSearchFormBlur)}
    >
      <input
        type="text"
        placeholder={placeholder}
        {...rest}
        {...register("query")}
      />
    </InputContainer>
  );
}
