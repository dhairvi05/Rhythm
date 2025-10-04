import numpy as np
import random

def propose_kolam1D(size_of_kolam, seed=None):
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)

    pt_dn = np.array([0, 1, 0, 0, 0, 1, 0, 0,
                      1, 0, 1, 1, 1, 0, 1, 1])
    pt_rt = np.array([0, 0, 1, 0, 0, 1, 1, 0,
                      0, 1, 0, 1, 1, 1, 0, 1])

    mate_pt_dn = {
        1: [2, 3, 5, 6, 9, 10, 12],
        2: [x for x in range(2, 17) if x not in [2, 3, 5, 6, 9, 10, 12]],
    }
    mate_pt_rt = {
        1: [2, 3, 4, 6, 7, 11, 13],
        2: [x for x in range(2, 17) if x not in [2, 3, 4, 6, 7, 11, 13]],
    }

    odd = (size_of_kolam % 2 != 0)
    hp = (size_of_kolam - 1) // 2 if odd else size_of_kolam // 2

    Mat = np.ones((hp + 1, hp + 1), dtype=int)

    h_inv = np.array([1, 2, 5, 4, 3, 9, 8, 7,
                      6, 10, 11, 12, 15, 14, 13, 16])
    v_inv = np.array([1, 4, 3, 2, 5, 7, 6, 9,
                      8, 10, 11, 14, 13, 12, 15, 16])

    # Indices of self-inverse tiles
    h_self = [i + 1 for i, v in enumerate(h_inv) if v == (i + 1)]
    v_self = [i + 1 for i, v in enumerate(v_inv) if v == (i + 1)]

    # Fill upper-left quadrant
    for i in range(1, hp + 1):
        for j in range(1, hp + 1):
            Valid_by_Up = mate_pt_dn[pt_dn[Mat[i-1, j] - 1] + 1]
            Valid_by_Lt = mate_pt_rt[pt_rt[Mat[i, j-1] - 1] + 1]
            Valids = list(set(Valid_by_Up).intersection(Valid_by_Lt))
            if Valids:
                Mat[i, j] = random.choice(Valids)
            else:
                Mat[i, j] = 1

    # Boundary conditions
    Mat = np.pad(Mat, ((0, 1), (0, 1)), constant_values=0)
    Mat[hp+1, 0] = 1
    Mat[0, hp+1] = 1

    for j in range(1, hp + 1):
        Valid_by_Up = mate_pt_dn[pt_dn[Mat[hp, j] - 1] + 1]
        Valid_by_Lt = mate_pt_rt[pt_rt[Mat[hp+1, j-1] - 1] + 1]
        Valids = set(Valid_by_Up).intersection(Valid_by_Lt).intersection(v_self)
        Mat[hp+1, j] = random.choice(list(Valids)) if Valids else 1

    for i in range(1, hp + 1):
        Valid_by_Up = mate_pt_dn[pt_dn[Mat[i-1, hp+1] - 1] + 1]
        Valid_by_Lt = mate_pt_rt[pt_rt[Mat[i, hp] - 1] + 1]
        Valids = set(Valid_by_Up).intersection(Valid_by_Lt).intersection(h_self)
        Mat[i, hp+1] = random.choice(list(Valids)) if Valids else 1

    Valid_by_Up = mate_pt_dn[pt_dn[Mat[hp, hp+1] - 1] + 1]
    Valid_by_Lt = mate_pt_rt[pt_rt[Mat[hp+1, hp] - 1] + 1]
    Valids = set(Valid_by_Up).intersection(Valid_by_Lt).intersection(h_self).intersection(v_self)
    Mat[hp+1, hp+1] = random.choice(list(Valids)) if Valids else 1

    # Mirror to construct full kolam
    Mat1 = Mat[1:hp+1, 1:hp+1]
    Mat2 = h_inv[Mat1[:, ::-1] - 1]
    Mat3 = v_inv[Mat1[::-1, :] - 1]
    Mat4 = v_inv[Mat2[::-1, :] - 1]

    if odd:
        top = np.hstack([Mat1, Mat[1:-1, -1][:, None], Mat2])
        mid = np.hstack([Mat[-1, 1:], h_inv[Mat[-1, -2:0:-1] - 1]])
        bottom = np.hstack([Mat3, v_inv[Mat[-2:0:-1, -1]] - 1, Mat4])
        M = np.vstack([top,
                       np.expand_dims(mid, axis=0),
                       bottom])
    else:
        M = np.vstack([np.hstack([Mat1, Mat2]),
                       np.hstack([Mat3, Mat4])])

    return M
