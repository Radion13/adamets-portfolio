/** Coordinates from the default and hover variants in Figma, before responsive scaling. */
export type ArtworkPose = readonly [x: number, y: number, width: number, height: number, rotation: number]

export interface CaseDoodle {
  node: string
  size: readonly [width: number, height: number]
  rest: ArtworkPose
  hover: ArtworkPose
}

export interface CaseArtwork {
  size: readonly [width: number, height: number]
  background: string
  doodles: CaseDoodle[]
}

export const caseArtwork = {
  documents: {
    size: [462, 522], background: '810-7206',
    doodles: [
      { node: '810-7484', size: [90, 90], rest: [255.38, 152.38, 77, 50, -45], hover: [360, 74.57, 77, 50, -45] },
      { node: '810-7452', size: [76, 83], rest: [123.45, 204.27, 48, 68, -30], hover: [19.18, 85.55, 48, 68, -30] },
    ],
  },
  plates: {
    size: [462, 522], background: '819-6868',
    doodles: [
      { node: '819-6984', size: [87, 88], rest: [256.79, 153.46, 69.55, 53.99, -46.68], hover: [360.75, 73.09, 69.55, 53.99, -46.68] },
      { node: '819-6991', size: [83, 65], rest: [120.19, 214.37, 77.93, 29.26, 30.1], hover: [20.61, 91.04, 77.93, 29.26, 30.1] },
    ],
  },
  marriage: {
    size: [462, 522], background: '767-9077',
    doodles: [
      { node: '810-6825', size: [83, 81], rest: [258.99, 157, 63.53, 52.92, -37.22], hover: [364.96, 77.33, 63.53, 52.92, -37.22] },
      { node: '810-6839', size: [63, 63], rest: [131.08, 216, 45.69, 43.76, -26.2], hover: [25.54, 93, 45.69, 43.76, -37.27] },
    ],
  },
  business: {
    size: [462, 522], background: '819-6491',
    doodles: [
      { node: '819-6649', size: [91, 88], rest: [255.08, 153.56, 73.77, 52.61, -39.3], hover: [359.7, 57.15, 73.77, 52.61, -39.3] },
      { node: '819-6640', size: [84, 87], rest: [119.42, 204.05, 54.46, 67.09, -36.32], hover: [15.12, 74.95, 54.46, 67.09, -36.32] },
    ],
  },
  featured: {
    size: [933, 586], background: '829-7283',
    doodles: [
      { node: '830-7413', size: [90, 90], rest: [494, 170.42, 77, 50, -45], hover: [163.2, 79.28, 77, 50, -45] },
      { node: '830-7405', size: [112, 76], rest: [476.8, 272.19, 104.2, 39.04, 22.18], hover: [89.12, 223.05, 104.2, 39.04, 22.18] },
      { node: '830-7399', size: [74, 72], rest: [648.2, 236.96, 60.04, 42.82, 39.65], hover: [350.45, 110.46, 60.04, 42.82, 39.65] },
      { node: '830-7465', size: [84, 82], rest: [572.92, 288, 63.34, 60.44, 15.18], hover: [265, 188.68, 68.71, 65.57, 15.18] },
    ],
  },
} satisfies Record<string, CaseArtwork>
