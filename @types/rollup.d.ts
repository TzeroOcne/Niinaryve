import { SourceMap } from 'rollup';

export interface AssetInfo {
	fileName: string;
	name?: string;
	needsCodeReference: boolean;
	source: string | Uint8Array;
	type: 'asset';
}

export interface ChunkInfo {
	code: string;
	dynamicImports: string[];
	exports: string[];
	facadeModuleId: string | null;
	fileName: string;
	implicitlyLoadedBefore: string[];
	imports: string[];
	importedBindings: { [imported: string]: string[] };
	isDynamicEntry: boolean;
	isEntry: boolean;
	isImplicitEntry: boolean;
	map: SourceMap | null;
	modules: {
		[id: string]: {
			renderedExports: string[];
			removedExports: string[];
			renderedLength: number;
			originalLength: number;
			code: string | null;
		};
	};
	moduleIds: string[];
	name: string;
	referencedFiles: string[];
	type: 'chunk';
}

type TransformResult = string | null | Partial<SourceDescription>;

interface SourceDescription {
	code: string;
	map?: string | SourceMap;
	ast?: ESTree.Program;
	assertions?: { [key: string]: string } | null;
	meta?: { [plugin: string]: unknown } | null;
	moduleSideEffects?: boolean | 'no-treeshake' | null;
	syntheticNamedExports?: boolean | string | null;
}

export type RenderChunkHook = (
	code: string,
	chunk: RenderedChunk,
	options: NormalizedOutputOptions,
	meta: { chunks: Record<string, RenderedChunk> }
) => { code: string; map?: SourceMapInput } | string | null;