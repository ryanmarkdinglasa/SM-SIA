import styled from "styled-components";

const cellStyling = `
    border-bottom: 1px solid #32394e;
    padding: 8px 12px;
`;

const edgePadding = `
    &: first-child {
        padding-left:0;
    }
    &: last-child {
        padding-right: 0;
    }
`;

export const Container = styled.div`
    margin-top: 12px;
    width: 100%;
    border-radius: 10px;
    padding: 15px 15px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    background: #2a3042;
`;

export const Heading = styled.div`
    color: #f6f6f6;
    font-size: 15px;
    font-weight: 700;
    margin: 0 0 8px 0
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    text-align:left;
`;
export const Th = styled.th`
 ${cellStyling}
 ${edgePadding}
`;

export const Tr = styled.tr`
    ${cellStyling}
    ${edgePadding}
`;
export const Td = styled.td`
    ${cellStyling}
    ${edgePadding}
`;
