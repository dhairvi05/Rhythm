import numpy as np
import matplotlib.pyplot as plt

def separated(M, count_islands, draw_kolam):
    """
    Show each island of the kolam separately with different colors.

    Parameters:
        M (2D numpy array): Kolam matrix
        count_islands (function): Python version of count_islands
        draw_kolam (function): Python version of draw_kolam
    """
    N, L, Isl = count_islands(M)

    colors = ['W']

    for i in range(N):
        q = i % len(colors)
        Dum = M.copy()
        Dum[Isl != L[i, 1]] = 0   # keep only this island
        draw_kolam(Dum, clr=colors[q])
        plt.axis([0, M.shape[1] + 1, 0, M.shape[0] + 1])
        plt.show(block=True)   # wait for user
        input("Press Enter for next island...")
