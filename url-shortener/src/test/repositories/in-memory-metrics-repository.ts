import { Metric } from '@/domain/entities/metric';
import { MetricRepository } from '@/domain/repositories/metric-repository';

export class InMemoryMetricRepository implements MetricRepository {
  public items: Metric[] = [];

  async findById(id: string): Promise<Metric | null> {
    const result = this.items.find((item) => item.id.toString() === id) || null;
    return result;
  }

  async create(metric: Metric): Promise<void> {
    this.items.push(metric);
  }

  async findByLink(linkId: string): Promise<Metric | null> {
    const result = this.items.find((item) => item.linkId === linkId) || null;
    return result;
  }

  async updateCount(metricId: string, count: number): Promise<Metric> {
    const index = this.items.findIndex(
      (item) => item.id.toString() === metricId,
    );
    this.items[index].clickCount = count;
    
    return this.items[index];
  }
}
