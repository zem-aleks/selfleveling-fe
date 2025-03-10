import { z } from "zod";

export const CreateHeroFormSchema = z.object({
  name: z.string().min(1, "Please enter a hero name."),
  language: z.string().min(2, "Please select a language."),
});

export type CreateHeroData = z.infer<typeof CreateHeroFormSchema>;
//
// export const createHero = () => {
//   const { data, error } = await supabase
//     .from("heroes")
//     .insert([{ some_column: "someValue", other_column: "otherValue" }])
//     .select();
// };
//
// export const deleteChat = async (
//   params: { chatId: string; companyId: string },
//   config?: AxiosRequestConfig,
// ): Promise<void> => {
//   return api.delete(`/chats/${params.companyId}/${params.chatId}`, {
//     signal: config?.signal,
//   });
// };
