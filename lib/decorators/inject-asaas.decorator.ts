import { Inject } from "@nestjs/common";
import { ASAAS_TOKEN } from "../asaas.constants";

export const InjectAsaas = () => Inject(ASAAS_TOKEN)
