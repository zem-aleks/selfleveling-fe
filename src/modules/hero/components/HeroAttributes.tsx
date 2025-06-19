import { ReactNode } from 'react';

import { ATTRIBUTES_MAP } from '@/modules/attributes/const/attributes';
import { HeroEntity } from '@/modules/hero/types';
import { H2 } from '@/ui/custom/H1';

type Props = {
  hero: HeroEntity;
};

export const HeroAttributes = ({ hero }: Props): ReactNode => {
  return (
    <div className={'w-full'}>
      <H2>Characteristics</H2>

      <div
        className={
          'flex w-full flex-row items-center justify-between gap-4 py-2'
        }
      >
        {hero.attributes.map((heroAttribute) => {
          const attribute = ATTRIBUTES_MAP.get(heroAttribute.attributeId);
          if (!attribute) {
            return null;
          }

          return (
            <div
              key={attribute.id}
              className={'flex flex-col items-center gap-1'}
            >
              <span className={'font-medium'}>{attribute.name}</span>
              <span
                className={
                  'w-14 rounded-md border-4 p-2 text-center font-bold text-emerald-600'
                }
              >
                {heroAttribute.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
