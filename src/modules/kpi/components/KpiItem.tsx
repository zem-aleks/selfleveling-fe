import { ReactNode } from 'react';

import { KpiWithMeasurementsEntity } from '@/modules/kpi/types';
import { Badge } from '@/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/ui/card';

export type Msg = { type: 'onKpiSaved'; kpi: KpiWithMeasurementsEntity };

type Props = {
  kpi: KpiWithMeasurementsEntity;
};

export const KpiItem = ({ kpi }: Props): ReactNode => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className={'flex flex-row items-center justify-between'}>
            <p>{kpi.title}</p>
            <Badge className={'bg-green-500'}>{kpi.status}</Badge>
          </div>
        </CardTitle>
        <CardDescription>
          <div className={'text-primary'}>{kpi.description}</div>
          <div className={'flex flex-row gap-4'}>
            <p>
              Your target is <b>{kpi.targetValue}</b>
            </p>
            <p>
              Your current value is{' '}
              <b>
                {kpi.measurements.length > 0
                  ? kpi.measurements[0].value
                  : 'Not defined'}
              </b>
            </p>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
