import { Axiom } from "@axiomhq/js";
import pino from "pino";

const isDev = process.env.NODE_ENV !== "production";
const isCloud = process.env.NEXT_PUBLIC_KAN_ENV === "cloud";
const VALID_LEVELS = ["fatal", "error", "warn", "info", "debug", "trace", "silent"];
const configuredLevel = process.env.LOG_LEVEL || (isDev ? "debug" : "info");
const level = VALID_LEVELS.includes(configuredLevel) ? configuredLevel : (isDev ? "debug" : "info");

const axiomToken = process.env.AXIOM_TOKEN;
const axiomDataset = process.env.AXIOM_DATASET;
const useAxiom = isCloud && !!axiomToken && !!axiomDataset;

function createAxiomStream(token: string, dataset: string): pino.DestinationStream {
  const client = new Axiom({ token });
  return {
    write(msg: string) {
      try {
        client.ingest(dataset, [JSON.parse(msg) as Record<string, unknown>]);
      } catch {
        // ignore malformed log lines
      }
    },
  };
}

export const logger = useAxiom
  ? pino(
      { level },
      pino.multistream([
        { stream: process.stdout, level },
        { stream: createAxiomStream(axiomToken, axiomDataset), level },
      ]),
    )
  : isDev
    ? pino(
        { level },
        pino.transport({
          target: "pino-pretty",
          options: { colorize: true, ignore: "pid,hostname", translateTime: "HH:MM:ss" },
        }),
      )
    : pino({ level });

export const createLogger = (module: string) => logger.child({ module });
