import { clsx } from 'clsx';
import { useState, useRef, type FormEvent } from 'react';

import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  type OptionType,
  type ArticleStateType,
} from '../../constants/articleProps';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { RadioGroup } from '../../ui/radio-group';
import { Select } from '../../ui/select';
import { Separator } from '../../ui/separator';
import { Text } from '../../ui/text';
import { useClose } from './useClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  setArticleState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  setArticleState,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultArticleState);
  const containerRef = useRef<HTMLDivElement>(null);

  useClose({
    isOpen,
    onClose: (): void => setIsOpen(false),
    rootRef: containerRef,
  });

  const handleToggle = (): void => {
    setIsOpen((open: boolean): boolean => !open);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setArticleState(formState);
  };

  const handleReset = (): void => {
    setFormState(defaultArticleState);
    setArticleState(defaultArticleState);
  };
  return (
    <div ref={containerRef}>
      <ArrowButton isOpen={isOpen} onClick={handleToggle} />
      <aside
        className={clsx(styles.container, {
          [styles.container_open]: isOpen,
        })}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as="h2" size={31} weight={800} uppercase>
            задайте параметры
          </Text>

          <Select
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            onChange={(option: OptionType): void => {
              setFormState((prev) => ({ ...prev, fontFamilyOption: option }));
            }}
            title="Шрифт"
          />

          <RadioGroup
            name="fontSize"
            selected={formState.fontSizeOption}
            options={fontSizeOptions}
            onChange={(option: OptionType): void =>
              setFormState((prev) => ({ ...prev, fontSizeOption: option }))
            }
            title="Размер шрифта"
          />

          <Select
            selected={formState.fontColor}
            options={fontColors}
            onChange={(option: OptionType): void =>
              setFormState((prev) => ({ ...prev, fontColor: option }))
            }
            title="Цвет текста"
          />

          <Separator />

          <Select
            selected={formState.backgroundColor}
            options={backgroundColors}
            onChange={(option: OptionType): void =>
              setFormState((prev) => ({ ...prev, backgroundColor: option }))
            }
            title="Цвет фона"
          />

          <Select
            selected={formState.contentWidth}
            options={contentWidthArr}
            onChange={(option: OptionType): void =>
              setFormState((prev) => ({ ...prev, contentWidth: option }))
            }
            title="Ширина контента"
          />

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </div>
  );
};
