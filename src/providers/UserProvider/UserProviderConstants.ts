import { createContext } from "react";
import { User } from "~/types/domain";

export const UserProviderContext = createContext(null as any as User);
