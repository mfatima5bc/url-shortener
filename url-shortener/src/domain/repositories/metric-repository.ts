import { Metric } from '../entities/metric';

export interface MetricRepository {
  findById(id: string): Promise<Metric | null>;
  findByLink(linkId: string): Promise<Metric | null>;
  create(metric: Metric): Promise<void>;
  updateCount(metricId: string, count: number): Promise<Metric>;
}
