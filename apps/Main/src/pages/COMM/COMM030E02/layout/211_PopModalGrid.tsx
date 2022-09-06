import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { Config } from "./211_PopModalGridConfig";
import { ESGrid } from "@vntgcorp/vntg-wdk-client";

export type PopGridHandler = {
  onMakeData: () => any[];
  confirm: () => any[];
};

type PopGridProps = {
  originRows?: any;
  onSelectRow?: any;
  ref?: any;
};

let popGrid: ESGrid;
const PopGrid: React.FC<PopGridProps> = forwardRef(
  ({ originRows, onSelectRow }, ref) => {
    useImperativeHandle(ref, () => ({
      onMakeData() {
        const updatedRows = popGrid.checkGridData();
        return updatedRows;
      },
      cleanup() {
        popGrid.clearnRow();
      },
      confirm() {
        if (
          popGrid.getGridView().displayOptions.selectionStyle === "singleRow"
        ) {
          const itemIndex = popGrid.getGridView().getCurrent().itemIndex;
          const checkedList = [originRows[itemIndex]];
          return checkedList;
        } else {
          const rows = popGrid.getCheckedRows();
          const checkedList = rows.map((rows) => originRows[rows]);
          ``;
          return checkedList;
        }
      },
    }));

    useEffect(() => {
      popGrid = new ESGrid("comm030e02popgroupgrid");
    }, []);

    useEffect(() => {
      if (popGrid) {
        popGrid.initializeGrid(Config, originRows);
        popGrid.setLookup("pgm_type", "AA10");
        popGrid.setBoolColumn("use_yn");
        const gridControlOptions = {
          editable: false,
          updatable: false,
          insertable: false,
          appendable: false,
          deletable: false,
          softDeleting: false,
        };
        popGrid.setGridOptions(gridControlOptions);
        popGrid.setMultiSelectRows(true);

        /**
         * 선택-onCellDblClicked
         */
        popGrid.getGridView().onCellDblClicked = function (
          grid: any,
          clickData: any
        ) {
          const row = clickData.dataRow;
          if (typeof row != "number") return;
          if (row > -1) {
            onSelectRow([grid.getDataSource().getJsonRows(row, true)]);
          }
        };
      }
    }, [popGrid]);

    useEffect(() => {
      popGrid.setRows(originRows);
    }, [originRows]);

    return (
      <div
        style={{ position: "relative", maxWidth: "1000px", height: "350px" }}
        className="searchProgramManager"
      >
        <div
          style={{ width: "100%", maxWidth: "1000px", height: "350px" }}
          id="comm030e02popgroupgrid"
        ></div>
      </div>
    );
  }
);

export default PopGrid;
