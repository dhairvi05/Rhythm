import numpy as np
import random

def propose_kolam2D(size_of_kolam, seed=None):
    """
    Generate a 2D Kolam matrix with diagonal symmetry.
    
    Parameters:
        size_of_kolam : int, size of the Kolam
        seed : int, optional, for reproducible randomness
    
    Returns:
        M : 2D numpy array of tile indices (1-16)
    """
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)

    # Connection rules
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

    # Initialize matrix with proper padding
    Mat = np.ones((hp + 2, hp + 2), dtype=int)

    # Inversion arrays
    h_inv = np.array([1, 2, 5, 4, 3, 9, 8, 7,
                      6, 10, 11, 12, 15, 14, 13, 16])
    v_inv = np.array([1, 4, 3, 2, 5, 7, 6, 9,
                      8, 10, 11, 14, 13, 12, 15, 16])
    h_self = [i + 1 for i, v in enumerate(h_inv) if v == (i + 1)]
    v_self = [i + 1 for i, v in enumerate(v_inv) if v == (i + 1)]

    # Flip 90 degrees for symmetry
    flip_90 = np.array([1, 3, 2, 5, 4, 6, 9, 8,
                        7, 11, 10, 13, 12, 15, 14, 16])

    diagsym = [1, 6, 8, 16]

    # Fill diagonal + upper triangle
    Mat[0, hp+1] = 1
    for i in range(1, hp+1):
        # Diagonal
        if i == 1:
            Mat[i, i] = random.choice(diagsym[:2])
        else:
            up = pt_dn[Mat[i-1, i]-1]
            lt = pt_rt[Mat[i, i-1]-1]
            Valids = set(mate_pt_dn.get(up+1, [])) & set(mate_pt_rt.get(lt+1, [])) & set(diagsym)
            Mat[i, i] = random.choice(list(Valids)) if Valids else 1

        # Upper triangle
        for j in range(i+1, hp+1):
            up = pt_dn[Mat[i-1, j]-1]
            lt = pt_rt[Mat[i, j-1]-1]
            Valids = set(mate_pt_dn.get(up+1, [])) & set(mate_pt_rt.get(lt+1, []))
            Mat[i, j] = random.choice(list(Valids)) if Valids else 1
            Mat[j, i] = flip_90[Mat[i, j]-1]  # diagonal symmetry

    # Fill boundaries
    for i in range(1, hp+1):
        up = pt_dn[Mat[i-1, hp+1]-1]
        lt = pt_rt[Mat[i, hp]-1]
        Valids = set(mate_pt_dn.get(up+1, [])) & set(mate_pt_rt.get(lt+1, [])) & set(h_self)
        Mat[i, hp+1] = random.choice(list(Valids)) if Valids else 1
        Mat[hp+1, i] = flip_90[Mat[i, hp+1]-1]

    # Corner
    up = pt_dn[Mat[hp, hp+1]-1]
    lt = pt_rt[Mat[hp+1, hp]-1]
    Valids = set(mate_pt_dn.get(up+1, [])) & set(mate_pt_rt.get(lt+1, [])) & set(h_self) & set(v_self)
    Mat[hp+1, hp+1] = random.choice(list(Valids)) if Valids else 1

    # Mirror quadrants
    Mat1 = Mat[1:hp+1, 1:hp+1]
    Mat2 = h_inv[Mat1[:, ::-1]-1]
    Mat3 = v_inv[Mat1[::-1, :]-1]
    Mat4 = v_inv[Mat2[::-1, :]-1]

    if odd:
        top = np.hstack([Mat1, Mat[1:-1, -1][:, None], Mat2])
        mid = np.hstack([Mat[-1, 1:], h_inv[Mat[-1, -2:0:-1]-1]])
        bottom = np.hstack([Mat3, (v_inv[Mat[-2:0:-1, -1]-1])[:, None], Mat4])
        M = np.vstack([top, np.expand_dims(mid, axis=0), bottom])
    else:
        M = np.vstack([np.hstack([Mat1, Mat2]),
                       np.hstack([Mat3, Mat4])])

    return M
