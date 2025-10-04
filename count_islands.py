import numpy as np

def count_islands(M):
    pt_dn = np.array([0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1])
    pt_rt = np.array([0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1])

    M = np.array(M, dtype=int)
    PMat = np.ones((M.shape[0] + 1, M.shape[1] + 1), dtype=int)
    PMat[1:, 1:] = M

    Island = np.zeros_like(PMat, dtype=int)
    Max_no = 1

    for i in range(1, PMat.shape[0]):
        for j in range(1, PMat.shape[1]):
            connects_down = pt_dn[PMat[i-1, j] - 1] == 1  # adjust index
            connects_rt = pt_rt[PMat[i, j-1] - 1] == 1

            cs = connects_down + connects_rt

            if cs == 0:
                Island[i, j] = Max_no
                Max_no += 1
            elif cs == 1:
                if connects_down:
                    Island[i, j] = Island[i-1, j]
                else:
                    Island[i, j] = Island[i, j-1]
            elif cs == 2:
                Island[i, j] = Island[i-1, j]
                Island[Island == Island[i, j-1]] = Island[i, j]

    Island = Island[1:, 1:]

    Lv = np.unique(Island)
    N = len(Lv)
    lengths = []

    for lv in Lv:
        size = np.sum(Island == lv)
        lengths.append([size, lv])

    lengths = np.array(lengths)

    return N, lengths, Island
