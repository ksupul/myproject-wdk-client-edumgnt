/**
 * UI 개발 Search Box Template
 *
 * @module SearchForm
 */
import { useForm } from "@vntgcorp/vntg-wdk-client";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { SFType } from "@vntgcorp/vntg-wdk-client";
import { Form, Field, SearchRow } from "@vntgcorp/vntg-wdk-client";
import * as yup from "yup";
/**
 * Search Component
 */
type SearchProps = {
  onSubmit?: (data: any, noneFlag?: any) => void;
};
export const Search = forwardRef(({ onSubmit }: SearchProps, ref) => {
  /////////////////////////////////////////////////////////////
  // default value 설정
  /////////////////////////////////////////////////////////////
  const defaultValues = {
    selectBox: "S01",
  };
  const schema = useMemo(() => {
    return yup.object({
      search_text: yup.string(),
    });
  }, []);
  /////////////////////////////////////////////////////////////
  // useForm hook
  /////////////////////////////////////////////////////////////
  const form = useForm({ defaultValues, schema });

  const handleSubmit = form.handleSubmit(onSubmit);

  useImperativeHandle(ref, () => ({
    cleanup() {
      form.reset();
    },
    submit() {
      handleSubmit();
    },
  }));
  /**
   * Custom option
   */

  return (
    <React.Fragment>
      <Form
        {...form}
        onSubmit={handleSubmit}
        formType="search"
        formName="COMM030E07-개인 메뉴 등록"
      >
        <SearchRow>
          <Field
            label="시스템 유형"
            name="selectBox"
            type={SFType.Selectbox}
            needAlloption={false}
            code={"AA02"}
            placeholder="SHE 시스템"
            labelStyles={{ minWidth: "100px", textAlign: "left" }}
          />
        </SearchRow>
      </Form>
    </React.Fragment>
  );
});
