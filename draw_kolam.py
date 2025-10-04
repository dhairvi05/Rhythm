import numpy as np
import matplotlib.pyplot as plt
from scipy.io import loadmat

def load_kolam_data(mat_file='kolam_data.mat'):
    """
    Loads the kolam point data from a MATLAB .mat file.
    Returns a list of NumPy arrays (complex numbers).
    """
    data = loadmat(mat_file)
    pt_matlab = data['pt'][0]  # adjust if your structure differs
    pt = [np.array(cell.flatten(), dtype=complex) for cell in pt_matlab]
    return pt

def draw_kolam(M, pt, clr='W'):
    """
    Draws a kolam using a matrix M and point data pt.
    
    Parameters:
        M : 2D numpy array
        pt : list of numpy arrays of complex points for each tile
        clr : color string (default 'b')
    """
    M = np.array(M, dtype=int)
    m, n = M.shape

    # Flip vertically like MATLAB's M(end:-1:1,:)
    M = M[::-1, :]

    plt.figure(figsize=(6, 6))

    for i in range(m):
        for j in range(n):
            if M[i, j] > 0:
                this = pt[M[i, j] - 1]  # MATLAB 1-based → Python 0-based
                x = j + np.real(this)
                y = i + np.imag(this)
                plt.plot(x, y, clr, linewidth=1.5)
                plt.plot(j, i, clr + '.')  # plot center dot

    plt.gca().set_aspect('equal', adjustable='box')
    plt.axis('off')
    plt.show()
