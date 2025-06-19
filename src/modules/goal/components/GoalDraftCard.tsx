import { ReactNode } from 'react';

import dayjs from 'dayjs';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { GoalDraft } from '@/modules/goal/types/goal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/card';
import { ChartConfig, ChartContainer } from '@/ui/chart';
import { H2 } from '@/ui/custom/H1';
import { Progress } from '@/ui/progress';

type Props = {
  goal: GoalDraft;
};

export const GoalDraftCard = ({ goal }: Props): ReactNode => {
  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={'flex flex-row items-start justify-between gap-2'}
        >
          <div className={'flex flex-col gap-2'}>
            <p className={'font-medium'}>Your goal is</p>
            <H2>{goal.goal}</H2>
          </div>
          <div
            className={
              'min-w-[120px] rounded-md border-2 border-blue-300 p-1 px-2'
            }
          >
            <p className={'text-right text-sm'}>Target Date</p>
            <p className={'text-muted-foreground text-right font-medium'}>
              {dayjs(goal.targetDate).format('D MMMM YYYY')}
            </p>
          </div>
        </CardTitle>
        <CardDescription
          className={'flex flex-row items-start justify-start gap-4 pt-4'}
        >
          <ScoreChart score={goal.evaluation.overallScore} />

          <div className="flex grow flex-col gap-4">
            <div className={'flex flex-col gap-2'}>
              <p>Is it enough specific?</p>
              <Progress value={goal.evaluation.specificScore} />
            </div>

            <div className={'flex flex-col gap-2'}>
              <p>Is it easy to measure?</p>
              <Progress value={goal.evaluation.measurableScore} />
            </div>

            <div className={'flex flex-col gap-2'}>
              <p>How is it achievable?</p>
              <Progress value={goal.evaluation.achievableScore} />
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className={'flex flex-col gap-4'}>
        <div>
          <p className={'font-bold'}>
            You can improve this goal by answering this question
          </p>
          <p>{goal.evaluation.followUpQuestion}</p>
        </div>

        <div className={''}>
          <p className={'font-bold'}>Improved goal example</p>
          <p>{goal.evaluation.improvedGoal}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ScoreChart = ({ score }: { score: number }) => {
  const color = score >= 70 ? 'var(--color-chart-2)' : 'var(--color-chart-4)';
  const chartData = [{ score, fill: color }];

  const chartConfig = {
    score: {
      label: 'Score',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="aspect-square size-40">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={Math.round(360 * (score / 100))}
        innerRadius={70}
        outerRadius={84}
      >
        <RadialBar dataKey="score" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 10}
                      className="fill-foreground text-5xl font-bold"
                    >
                      {chartData[0].score.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-sm"
                    >
                      Overall Score
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};
