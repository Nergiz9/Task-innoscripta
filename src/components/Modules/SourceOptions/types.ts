type SourceProps = {
    id: string;
    name: string;
}
export type SourceOptionsProps = {
    sources: SourceProps[];
    onChange: (id: string) => void;
    selectedSource: string[];
};